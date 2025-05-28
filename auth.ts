import NextAuth, { AuthError } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import z from "zod";
import { UserType } from "./src/types/user.types";
import { prisma } from "@/lib/prisma"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();
export const {
	handlers: { POST, GET },
	signIn,
	signOut,
	auth,
} = NextAuth({
	...authConfig,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	cookies: {
		sessionToken: {
			name: `next-auth.session-token.${process.env.NEXT_PUBLIC_APP_NAME}`,
			options: {
				httpOnly: true,
				path: "/",
				secure: true,
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
			},
		},
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Credentials",
			async authorize(credentials): Promise<UserType | null> {
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z
							.string()
							.min(8, "Password must be at least 8 characters"),
					})
					.safeParse(credentials);
				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await prisma.user.findUnique({
						where: { email },
					});
					if (!user) {
						throw new AuthError("Invalid email or password");
					}
					const isMatch = await bcrypt.compare(password, user.password);
					if (isMatch) {
						return user;
					}
				}
				return null;
			},
		}),
	],
	callbacks: {
		async session({ session }) {
			const user: UserType | null = await prisma.user.findUnique({
				where: { email: session.user?.email || "" },
			});
			if (!user) {
				throw new Error("User not found");
			}
			session.userId = user.id;
			session.user = user as UserType;
			return session;
		},
		authorized({ auth, request: { nextUrl } }) {
			console.log("Auth callback triggered", auth, nextUrl);
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) {
					return true; // Allow access to dashboard if logged in
				}
				return NextResponse.redirect(new URL("/auth/login", nextUrl)); // Redirect to login if trying to access dashboard without being logged in
			} else if (isLoggedIn) {
				return NextResponse.redirect(new URL("/dashboard", nextUrl));
			}
			return true; // Allow access to other pages if not on dashboard
		},
	},
});

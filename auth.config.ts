import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
	pages: { signIn: "/auth/login" },
	callbacks: {
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

	providers: [],
} satisfies NextAuthConfig;

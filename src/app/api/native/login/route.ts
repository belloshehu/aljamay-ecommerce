import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";
import { Resend } from "resend";
import { StatusCodes } from "http-status-codes";
import { LoginEmailTemplate } from "@/components/email/login.template";

const resend = new Resend(process.env.RESEND_API_KEY!);
const expiresIn = process.env.VERIFICATION_CODE_EXPIRATION!;

/*
	Generates magic link with a token embedded in it and send it to the user's email. 
	User clicks on the link to get redirected to the mobile app where the token is sent back to the login-verify 
	end-point to complete the login process.

*/
export async function POST(request: NextRequest) {
	const { prisma } = await import("@/lib/prisma");
	try {
		const body = await request.json();
		const { email } = body;

		if (!email) {
			return NextResponse.json(
				{ message: "Email is required" },
				{ status: 400 }
			);
		}

		// Here you would typically check the credentials against your database
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Email not registered" },
				{ status: 401 }
			);
		}

		// construct a magic link
		const token = await signJWT({ email, id: user.id });
		const magicLink = "https://aljamay.com/auth/login-redirect?token=" + token;

		// Send email with the magic link
		const { error } = await resend.emails.send({
			from: "Aljamay <onboarding@resend.dev>",
			to: [user.email],
			subject: "Login verification",
			react: LoginEmailTemplate({
				firstName: user.firstName,
				link: magicLink,
				expiresIn,
			}),
		});

		return NextResponse.json(
			{ message: "Login link was sent to your email." },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

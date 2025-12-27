import { NextRequest, NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";
import { StatusCodes } from "http-status-codes";
import { sendVerificationEmail } from "@/lib/auth";

/*
 * 	Logs in user whose emaik is verified.
 *	For user's with unverified email, it generates magic link with a token embedded in it and send it to the user's email.
 *	User clicks on the link to get redirected to the mobile app where the token is sent back to the email-verify
 *	end-point to complete the email verification process.
 */

export async function POST(request: NextRequest) {
	const { prisma } = await import("@/lib/prisma");
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		if (!password) {
			return NextResponse.json(
				{ error: "Password is required" },
				{ status: 400 }
			);
		}

		// Here you would typically check the credentials against your database
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Email not registered" },
				{ status: 401 }
			);
		}

		if (!user.verified) {
			await sendVerificationEmail(user);
			return NextResponse.json(
				{
					data: { emailVerified: false },
					error: "Email not verified.  Check your email for verification link",
				},
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		const token = await signJWT({ email, id: user.id });

		return NextResponse.json(
			{ data: { user, token }, message: "Login success" },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

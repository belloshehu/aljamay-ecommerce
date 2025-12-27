import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import { sendVerificationEmail } from "@/lib/auth";

/*
 *	Generates magic link with a token embedded in it and send it to the user's email.
 *	User clicks on the link to get redirected to the mobile app where the token is sent back to the login-verify
 *	end-point to complete the login process.
 */

export async function POST(request: NextRequest) {
	const { prisma } = await import("@/lib/prisma");
	try {
		const body = await request.json();
		const { email } = body;

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
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
					message: "Check your email for verification link",
				},
				{ status: StatusCodes.OK }
			);
		}

		return NextResponse.json(
			{ error: "Email already verified" },
			{ status: StatusCodes.BAD_REQUEST }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

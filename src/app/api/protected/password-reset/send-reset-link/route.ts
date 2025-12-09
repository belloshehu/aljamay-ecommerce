import { PassResetEmailTemplate } from "@/components/email/password-reset-template";
import { signJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/*
Send code to verify password reset from user
*/
const resend = new Resend(process.env.RESEND_API_KEY!);
const expiresIn = process.env.VERIFICATION_CODE_EXPIRATION!;

type BodyType = {
	email: string;
};
export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as BodyType;
		const { email } = body;

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// find user the given email address:
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return NextResponse.json(
				{ message: "Email is not registered" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// update user with the code
		await prisma.user.update({
			where: { email: user.email },
			data: {
				verificationDate: new Date(),
			},
		});

		// create token
		const token = await signJWT({ email, id: user.id });
		// construct a magic link
		const magicLink = "https://aljamay.com/auth/reset-redirect?token=" + token;
		// Send email with the magic link
		const { error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [user.email],
			subject: "Password Reset",
			react: PassResetEmailTemplate({
				firstName: user.firstName,
				link: magicLink,
				expiresIn,
			}),
		});
		if (error) {
			return NextResponse.json(
				{
					message: "Failed to send verification code.",
				},

				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		return NextResponse.json(
			{
				message:
					"Check your email for verification code. It will expire in " +
					expiresIn +
					" minutes.",
				data: {
					expiresIn,
				},
			},

			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: "Failed to send verification code.",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

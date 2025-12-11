import { EmailTemplate } from "@/components/email/email-template";
import { authMiddleware } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequestWithUser } from "@/types/user.types";
import { randomInt } from "crypto";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const expiresIn = process.env.VERIFICATION_CODE_EXPIRATION!;

export async function GET(req: NextRequest) {
	try {
		// run authmiddeware
		const request = (await authMiddleware(
			req as NextRequestWithUser
		)) as NextRequestWithUser;
		const user = request.user;
		const code = randomInt(100000, 900000);

		// update user with the code
		await prisma.user.update({
			where: { email: user.email },
			data: {
				emailVerified: new Date(),
				verificationCode: code.toString(),
			},
		});
		// Send email
		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [user.email],
			subject: "Email verification",
			react: EmailTemplate({
				firstName: user.firstName,
				bodyText: "Enter the below code to verify your email: ",
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
		console.log(error);
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

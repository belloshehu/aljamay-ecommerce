import { authMiddleware } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequestWithUser } from "@/types/user.types";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

/*
   Verifies code send from client for email verification

*/
export async function POST(request: NextRequestWithUser) {
	try {
		// run authmiddleware
		await authMiddleware(request);

		// get the verification from the client
		const body = (await request.json()) as { code: string };

		if (!body.code) {
			return NextResponse.json(
				{ error: "Verification code required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// get the user's verification code
		const { verificationCode, emailVerified } = request.user;
		if (!verificationCode || !emailVerified) {
			return NextResponse.json(
				{ error: "No verification code" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// check whether the code has expired or not
		const expiresIn = parseInt(process.env?.VERIFICATION_CODE_EXPIRATION!);
		const isValid =
			Date.now() - emailVerified.getTime() < expiresIn * 60 * 1000;

		if (!isValid) {
			return NextResponse.json(
				{ error: "Invalid verification code" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// update the user
		await prisma.user.update({
			where: { email: request.user.email },
			data: {
				verified: true,
				verificationCode: null,
			},
		});

		return NextResponse.json(
			{ message: "Verification successful" },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: "Verification failed",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

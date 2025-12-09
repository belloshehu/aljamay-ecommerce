import { hasExpired } from "@/lib/auth";
import { verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { NextRequestWithUser } from "@/types/user.types";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

/*
   Verifies code send from client before password reset 

*/

type BodyType = {
	password: string;
	passwordRepeat: string;
};

export async function POST(
	request: NextRequestWithUser,

	{ params }: { params: Promise<{ token: string }> }
) {
	try {
		// get the new from the client
		const body = (await request.json()) as BodyType;
		const { password, passwordRepeat } = body;
		const { token } = await params;

		if (!token) {
			return NextResponse.json(
				{ error: "Invalid reset link" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ error: "Password is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (password !== passwordRepeat) {
			return NextResponse.json(
				{ message: "Passwords do not match" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// decode the token received from the user
		const { email } = verifyJWT(token);

		// find user the given email address:
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user || !user.verificationDate) {
			return NextResponse.json(
				{ message: "Invalid reset link" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// check if the link has expired
		const _dateHasExpired = hasExpired(user?.verificationDate);

		if (_dateHasExpired) {
			return NextResponse.json(
				{ error: "Invalid reset link." },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// update the user's password
		const hashedPassword = await bcrypt.hash(password, 10);
		await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword,
				verificationCode: null,
			},
		});

		return NextResponse.json(
			{ message: "Password reset successful" },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: "Password reset failed",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

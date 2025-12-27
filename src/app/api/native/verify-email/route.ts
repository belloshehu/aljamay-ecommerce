import { hasExpired } from "@/lib/auth";
import { signJWT, verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

/*
    Grabs token in the search parameters of the route to verify or confirm user's email. 
    Token is embedded in magic link and sent via email.
*/

export async function POST(request: NextRequest) {
	try {
		// get the token
		const token = request.nextUrl.searchParams.get("token");
		if (!token) {
			return NextResponse.json(
				{ error: "Invalid verification link" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// decode the token received from the user
		const { email } = verifyJWT(token);
		// find user the given email address:
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user || !user.verificationDate) {
			return NextResponse.json(
				{ message: "Invalid verification link" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// check if the link has expired
		const _dateHasExpired = hasExpired(user?.verificationDate);
		if (_dateHasExpired) {
			return NextResponse.json(
				{ error: "Link has expired." },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		const jwtToken = await signJWT({ email, id: user.id });
		// update the user's login token
		await prisma.user.update({
			where: { email },
			data: {
				verificationCode: null,
				verified: true,
				verificationDate: null,
			},
		});

		return NextResponse.json(
			{
				data: { user, token: jwtToken },
				message: "Email verified successfully",
			},
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: "Email verification failed",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

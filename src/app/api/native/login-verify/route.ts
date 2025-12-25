import { hasExpired } from "@/lib/auth";
import { verifyJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

/*
    Grabs token in the search parameters of the route to verify or confirm user's login. 
    Token is embedded in magic link and sent via email.
*/

export async function POST(request: NextRequest) {
	try {
		// get the token
		const token = request.nextUrl.searchParams.get("token");
		if (!token) {
			return NextResponse.json(
				{ error: "Invalid login link" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		// decode the token received from the user
		const { email } = verifyJWT(token);

		// find user the given email address:
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user || !user.verificationDate) {
			return NextResponse.json(
				{ message: "Invalid login link" },
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

		// update the user's login token
		await prisma.user.update({
			where: { email },
			data: {
				verificationCode: null,
			},
		});

		return NextResponse.json(
			{ user, message: "Logged in successfully" },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{
				error: "Login failed",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

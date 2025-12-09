// JWT util functions used to encoding and decoding token from react native client

import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
import { NextRequestWithUser } from "@/types/user.types";
import { StatusCodes } from "http-status-codes";

interface JWTPayload extends JwtPayload {
	id: string;
	email: string;
}
export async function signJWT(data: JWTPayload) {
	return jwt.sign(data, process.env.AUTH_SECRET!, {
		expiresIn: "7d",
	});
}

export function verifyJWT(token: string) {
	return jwt.verify(token, process.env.AUTH_SECRET!) as JWTPayload;
}

export async function authMiddleware(
	req: NextRequestWithUser
): Promise<NextRequestWithUser | NextResponse> {
	const token = req.headers.get("authorization")?.replace("Bearer ", "");

	if (!token)
		return NextResponse.json(
			{ error: "Unauthorized" },
			{ status: StatusCodes.UNAUTHORIZED }
		);
	try {
		const payload = verifyJWT(token) as JWTPayload;
		const user = await prisma.user.findUnique({
			where: { email: payload.email },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: StatusCodes.UNAUTHORIZED }
			);
		}

		// add user object to the request object
		req.user = user;
		return req;
		// uncomment when used in middleware file
		//return NextResponse.next();
	} catch {
		return NextResponse.json(
			{ error: "Invalid token" },
			{ status: StatusCodes.UNAUTHORIZED }
		);
	}
}

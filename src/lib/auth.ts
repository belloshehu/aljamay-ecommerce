import { NextRequestWithUser, UserType } from "@/types/user.types";
import { StatusCodes } from "http-status-codes";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware as getUserFromHeader } from "./jwt";
import { auth } from "../../auth";

export const hasExpired = (date: Date) => {
	/* Returns true if time has expired. Otherwise false
    Params: 
        date: date in the future or past

        Example:
            If current date and time is 06/12/2025 10:20Am, and the argument passed is earlier, it will return true
    */

	const expiresIn = parseInt(process.env?.VERIFICATION_CODE_EXPIRATION!);
	return Date.now() - date.getTime() >= expiresIn * 60 * 1000;
};

/*
 *  Function to return user browser session or using the JWT Authorization header
 *
 *  Params:
 *       request: Instance of request from request handler
 *
 *  return:
 *       user or NextResponse: User object or next response when user is not authenticated
 */

export const getUserFromSessionOrJWT = async (
	req: NextRequest
): Promise<UserType | null> => {
	const session = await auth();

	let user = null;
	// if session is found, then it is from web client
	if (session?.user) {
		user = session.user;
	} else {
		// otherwise it is a mobile client
		const _req = req as NextRequestWithUser;
		const request = (await getUserFromHeader(_req)) as NextRequestWithUser;
		user = request.user;
	}
	return user;
};

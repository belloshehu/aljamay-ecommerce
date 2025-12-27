import { NextRequestWithUser, UserType } from "@/types/user.types";
import { StatusCodes } from "http-status-codes";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware as getUserFromHeader, signJWT } from "./jwt";
import { auth } from "../../auth";
import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/email/email-template";
import { prisma } from "./prisma";

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

/*  
	Higher other function for authenitcated requests. 
 	This is version of the getUserFromSessionOrJWT function
*/
type RouteParams = { [key: string]: string | undefined };

export const withAuth =
	<T = any>(
		handler: (
			request: NextRequest,
			user: UserType,
			params?: RouteParams
		) => Promise<T>
	) =>
	async (
		request: NextRequest,
		context: { params?: RouteParams }
	): Promise<T | NextResponse> => {
		let user: UserType | null = null;

		const session = await auth();

		// Web client (NextAuth session)
		if (session?.user) {
			user = session.user as UserType;
		} else {
			// Mobile / API client
			const _req = request as any as NextRequestWithUser;
			const res = (await getUserFromHeader(_req)) as NextRequestWithUser;
			user = res.user;
		}

		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		return handler(request, user, context.params);
	};

const resend = new Resend(process.env.RESEND_API_KEY!);
const expiresIn = process.env.VERIFICATION_CODE_EXPIRATION!;
export const sendVerificationEmail = async (user: UserType) => {
	// update user with the verification date to determine whehter a link is exoired or not
	await prisma.user.update({
		where: { email: user.email },
		data: {
			verificationDate: new Date(),
		},
	});

	// construct a magic link
	const token = await signJWT({ email: user.email, id: user.id });
	const magicLink =
		"https://aljamay.com/auth/email-verification-redirect?token=" + token;

	// Send email with the magic link
	const { error } = await resend.emails.send({
		from: "Aljamay <onboarding@resend.dev>",
		to: [user.email],
		subject: "Email verification",
		react: EmailVerificationTemplate({
			firstName: user.firstName,
			link: magicLink,
			expiresIn,
		}),
	});
};

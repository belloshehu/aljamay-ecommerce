import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../lib/prisma";
import { Resend } from "resend";
import { signJWT } from "@/lib/jwt";
import { EmailVerificationTemplate } from "@/components/email/email-template";
import { sendVerificationEmail } from "@/lib/auth";

const resend = new Resend(process.env.RESEND_API_KEY!);
const expiresIn = process.env.VERIFICATION_CODE_EXPIRATION!;
export async function POST(request: NextRequest) {
	if (!process.env.DATABASE_URL) {
		return NextResponse.json(
			{ message: "Database connection not configured" },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
	try {
		const body = await request.json();
		const {
			firstName,
			lastName,
			email,
			password,
			passwordRepeat,
			marketingAccepted,
			privacyAccepted,
		} = body;

		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!firstName) {
			return NextResponse.json(
				{ error: "Last name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!lastName) {
			return NextResponse.json(
				{ error: "Last name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ error: "password is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (password !== passwordRepeat) {
			return NextResponse.json(
				{ error: "Passwords do not match" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!privacyAccepted) {
			return NextResponse.json(
				{ error: "You must accept the privacy policy" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!marketingAccepted) {
			return NextResponse.json(
				{ error: "Marketing acceptance is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}
		const exists = await prisma.user.findUnique({ where: { email: email } });

		if (exists) {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: hashedPassword,
				markettingAccepted: marketingAccepted,
				privacyAccepted: privacyAccepted,
			},
		});

		// Send email verification link
		await sendVerificationEmail(user);

		return NextResponse.json(
			{
				user,
				message: "Signup success! Check your email for verification link.",
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message || "Failed to sign up",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

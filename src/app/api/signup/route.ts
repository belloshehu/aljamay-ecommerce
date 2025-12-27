import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/auth";

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
			confirmPassword,
			marketingAccepted,
			privacyAccepted,
		} = body;

		if (!email) {
			return NextResponse.json(
				{ message: "Email is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!firstName) {
			return NextResponse.json(
				{ message: "Last name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!lastName) {
			return NextResponse.json(
				{ message: "Last name is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ message: "password is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (password !== confirmPassword) {
			return NextResponse.json(
				{ message: "Passwords do not match" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!privacyAccepted) {
			return NextResponse.json(
				{ message: "You must accept the privacy policy" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		if (!marketingAccepted) {
			return NextResponse.json(
				{ message: "Marketing acceptance is required" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}
		const exists = await prisma.user.findUnique({ where: { email: email } });
		if (exists) {
			return NextResponse.json(
				{ error: "Email already exists" },
				{ status: 400 }
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

		// Send verification email
		await sendVerificationEmail(user);

		return NextResponse.json(
			{
				user,
				message: "Signup success! Check your email for verification link.",
			},
			{ status: 201 }
		);
	} catch (error: any) {
		// throw new Error("Signup failed: " + error.message);
		return NextResponse.json(
			{
				message: error.message || "An unexpected error occurred",
				error: error.message || "An unexpected error occurred",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

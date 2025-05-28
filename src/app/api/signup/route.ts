import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export async function POST(request: NextRequest) {
	const { prisma } = await import("@/lib/prisma");

	if (!process.env.DATABASE_URL) {
		return NextResponse.json(
			{ message: "Database connection not configured" },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
	try {
		const body = await request.json();
		const { firstName, lastName, email, password } = body;

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

		const exists = await prisma.user.findUnique({ where: { email } });

		if (exists) {
			return NextResponse.json(
				{ message: "Email already exists" },
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
			},
		});

		return NextResponse.json(
			{
				user,
				message: "User registered!",
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "Internal server error",
				error: error.message,
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

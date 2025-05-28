import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
	const { prisma } = await import("@/lib/prisma");

	// if (!process.env.DATABASE_URL) {
	// 	return NextResponse.json(
	// 		{ message: "Database connection not configured" },
	// 		{ status: 500 }
	// 	);
	// }
	try {
		const body = await request.json();
		const { email, password } = body;

		if (!email) {
			return NextResponse.json(
				{ message: "Email is required" },
				{ status: 400 }
			);
		}

		if (!password) {
			return NextResponse.json(
				{ message: "Password is required" },
				{ status: 400 }
			);
		}
		// Here you would typically check the credentials against your database
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return NextResponse.json(
				{ message: "Invalid email or password" },
				{ status: 401 }
			);
		}
		return NextResponse.json(
			{ user, message: "Login successful" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Login error:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

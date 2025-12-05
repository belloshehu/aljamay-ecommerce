import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		return NextResponse.json(
			{ message: "Hello world people of baga" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Greeting errors:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}

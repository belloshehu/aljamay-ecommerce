import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user) {
			redirect("/auth/login");
		}

		if (session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "You do not have permission to create a product" },
				{ status: 403 }
			);
		}

		const body = await request.json();
		const product = await prisma.product.create({
			data: { userId: session.user.id, ...body },
		});
		return NextResponse.json({ data: product }, { status: 200 });
	} catch (error: any) {
		console.error("Error creating product:", error);
		return NextResponse.json(
			{ message: "Failed to create product", error: error.message },
			{ status: 500 }
		);
	}
}

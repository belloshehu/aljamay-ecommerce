import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Ensure that the request is a DELETE request
	try {
		const session = await auth();
		if (!session?.user) {
			redirect("/auth/login");
		}

		if (session.user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "You do not have permission to delete a product" },
				{ status: 403 }
			);
		}
		const { id } = await params;
		if (!id) {
			return NextResponse.json(
				{ message: "Product ID is required" },
				{ status: 400 }
			);
		}

		await prisma.product.delete({
			where: { id },
		});
		return NextResponse.json(
			{ message: "Product deleted successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error deleting product:", error);
		return NextResponse.json(
			{ message: "Failed to delete product", error: error.message },
			{ status: 500 }
		);
	}
}

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/user.types";
import { getUserFromSessionOrJWT, withAuth } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";

/*
	Fetch product by Id: 
*/
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const product = await prisma.product.findUnique({
			where: {
				id,
			},
			include: {
				reviews: {
					include: {
						user: true,
					},
				},
				orderItems: {
					include: {
						product: true,
					},
				},
			},
		});

		if (!product) {
			return NextResponse.json(
				{
					error: "Product not found",
				},
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}

		return NextResponse.json(
			{
				message: "Product found",
				data: product,
			},
			{
				status: StatusCodes.OK,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch product",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Ensure that the request is a DELETE request
	try {
		const user = (await getUserFromSessionOrJWT(request)) as UserType;

		if (user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "Permission required" },
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
		return NextResponse.json(
			{ message: "Failed to delete product", error: error.message },
			{ status: 500 }
		);
	}
}

// Update product by Id
export const PATCH = withAuth(async (request: NextRequest, user, context) => {
	try {
		if (user.role !== "ADMIN") {
			return NextResponse.json(
				{ message: "Permission required" },
				{ status: StatusCodes.FORBIDDEN }
			);
		}
		const { id } = await context!;
		const body = await request.json();

		const updatedProduct = await prisma.product.update({
			where: { id },
			data: body,
		});

		return NextResponse.json(
			{
				message: "Product updated successfully",
				data: updatedProduct,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to update product", error: error.message },
			{ status: 500 }
		);
	}
});

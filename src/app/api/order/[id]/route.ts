import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/user.types";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";

/*
    Fetch order by Id: 
*/
export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await getUserFromSessionOrJWT(req); // this authenticate user
		const { id } = await params;
		const product = await prisma.order.findUnique({
			where: {
				id,
			},
			include: {
				orderItems: {
					include: {
						product: true, // Include product details in the order items
					},
				},
				shippingAddress: true,
			},
		});

		if (!product) {
			return NextResponse.json(
				{
					error: "Order not found",
				},
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}

		return NextResponse.json(
			{
				message: "Order found",
				data: product,
			},
			{
				status: StatusCodes.OK,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch order",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

// Cancel Order
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

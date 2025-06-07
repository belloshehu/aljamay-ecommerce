import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth();

		if (!session?.user) {
			return NextResponse.json(
				{
					message: "You must be logged in to access this resource",
				},
				{
					status: 401,
				}
			);
		}

		const { id } = await params;
		if (!id) {
			return NextResponse.json(
				{
					message: "Cart item ID is required",
				},
				{
					status: 400,
				}
			);
		}

		const deletedCartItem = await prisma.cartItem.delete({
			where: {
				id,
				userId: session.user.id, // Ensure the item belongs to the user
			},
		});

		return NextResponse.json(
			{
				message: "Item removed from cart successfully",
				data: deletedCartItem,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to remove item from cart",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
			}
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json(
				{
					message: "You must be logged in to access this resource",
				},
				{
					status: 401,
				}
			);
		}

		const body = await req.json();
		const { id } = await params;
		const { quantity } = body;
		if (!id || !quantity) {
			return NextResponse.json(
				{
					message: "Cart item ID and quantity are required",
				},
				{
					status: 400,
				}
			);
		}
		if (quantity < 1) {
			return NextResponse.json(
				{
					message: "Quantity must be at least 1",
				},
				{
					status: 400,
				}
			);
		}
		const updatedCartItem = await prisma.cartItem.update({
			where: {
				id,
				userId: session.user.id, // Ensure the item belongs to the user
			},
			data: {
				quantity: quantity,
			},
		});
		return NextResponse.json(
			{
				message: "Cart item updated successfully",
				data: updatedCartItem,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to update cart item",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
			}
		);
	}
}

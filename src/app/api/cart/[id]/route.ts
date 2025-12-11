import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { StatusCodes } from "http-status-codes";

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const user = await getUserFromSessionOrJWT(req);
		if (!user) {
			return NextResponse.json(
				{
					message: "Unauthorized. Please login",
				},
				{
					status: StatusCodes.UNAUTHORIZED,
				}
			);
		}

		const { id } = await params;
		console.log(id);
		if (!id) {
			return NextResponse.json(
				{
					message: "Cart item ID is required",
				},
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}

		const deletedCartItem = await prisma.cartItem.delete({
			where: {
				id,
				userId: user.id, // Ensure the item belongs to the user
			},
		});

		return NextResponse.json(
			{
				message: "Item removed from cart.",
				error: "Item removed from cart.",
				data: deletedCartItem,
			},
			{
				status: StatusCodes.CREATED,
			}
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				message: "Failed to remove item from cart",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const user = await getUserFromSessionOrJWT(req);
		if (!user) {
			return NextResponse.json(
				{
					message: "Unauthorized. Please login",
				},
				{
					status: StatusCodes.UNAUTHORIZED,
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
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}
		if (quantity < 1) {
			return NextResponse.json(
				{
					message: "Quantity must be at least 1",
				},
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}
		const updatedCartItem = await prisma.cartItem.update({
			where: {
				id,
				userId: user.id, // Ensure the item belongs to the user
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
				status: StatusCodes.OK,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to update cart item",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

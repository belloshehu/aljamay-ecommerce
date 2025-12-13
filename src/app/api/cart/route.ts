import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { UserType } from "@/types/user.types";

export async function GET(req: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(req)) as UserType;
		const cartItems = await prisma.cartItem.findMany({
			where: {
				userId: user.id, // Assuming you have a userId field in your cart item model
			},
			include: {
				product: true, // Include product details
			},
		});
		return NextResponse.json(
			{
				message: "Cart items retrieved",
				data: cartItems,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to retrieve cart items",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
			}
		);
	}
}

/**
 * Adds an item to the user's cart.
 * If the item already exists in the cart, it updates the quantity.
 * @param {NextRequest} req - The request object containing productId and quantity.
 * @returns {NextResponse} - A response indicating success or failure.
 */

export async function POST(req: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(req)) as UserType;
		const { productId, quantity } = await req.json();
		if (!productId || !quantity) {
			return NextResponse.json(
				{
					message: "Product ID and quantity are required",
				},
				{
					status: 400,
				}
			);
		}
		if (quantity <= 0) {
			return NextResponse.json(
				{
					message: "Quantity must be greater than zero",
				},
				{
					status: 400,
				}
			);
		}

		// if product is already in the cart, update the quantity
		const existingCartItem = await prisma.cartItem.findFirst({
			where: {
				productId,
				userId: user.id, // Assuming you have a userId field in your cart item model
			},
		});
		if (existingCartItem) {
			const updatedCartItem = await prisma.cartItem.update({
				where: {
					id: existingCartItem.id, // Assuming you have an id field in your cart item model
				},
				data: {
					quantity: existingCartItem.quantity + quantity, // Increment the quantity
				},
			});
			return NextResponse.json(
				{
					message: "Item quantity updated in cart",
					data: updatedCartItem,
				},
				{
					status: 200,
				}
			);
		}

		const cartItem = await prisma.cartItem.create({
			data: {
				productId,
				quantity,
				userId: user.id, // Assuming you have a userId field in your cart item model
			},
		});
		return NextResponse.json(
			{
				message: "Item added to cart.",
				data: cartItem,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to add item to cart",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{
				status: 500,
			}
		);
	}
}

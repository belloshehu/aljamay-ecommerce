import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Post request handler for order creation
export async function POST(request: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			// If the user is not authenticated, redirect to the login page
			return NextResponse.json(
				{
					error: "Unauthorized. Please log in.",
				},
				{
					status: 401,
				}
			);
		}

		const body = await request.json();
		const {
			cartItems: cartItemIds,
			shippingAddressId,
			paymentMethod,
			totalAmount,
		} = body;
		console.log("Creating order with data:", body, shippingAddressId);
		if (!cartItemIds || !shippingAddressId || !paymentMethod || !totalAmount) {
			return NextResponse.json(
				{
					message:
						"Missing required fields: cartItems, shippingAddressId, or paymentMethod",
				},
				{ status: 400 }
			);
		}
		const cartItems = await prisma.cartItem.findMany({
			where: {
				id: {
					in: cartItemIds,
				},
				userId: session.user.id, // Ensure the cart items belong to the authenticated user
			},
			include: {
				product: true, // Include product details if needed
			},
		});

		const order = await prisma.order.create({
			data: {
				userId: session.user.id,
				shippingAddressId,
				paymentMethod,
				totalAmount,
			},
		});

		// Create order items based on the cart items
		await prisma.orderItem.createMany({
			data: cartItems.map((item, index) => ({
				orderId: order.id,
				productId: item.product.id,
				quantity: item.quantity,
				price: item.product.price, // Store the price at the time of order
				orderNumber: `ALJ${order.id.slice(-5)}${index}`, // Generate a unique order number
			})),
		});

		// Retrieve the created order items directly from the database
		const createdOrderItems = await prisma.orderItem.findMany({
			where: {
				orderId: order.id,
			},
		});

		// Update order with the created order items
		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				orderItems: {
					connect: createdOrderItems.map((item) => ({
						id: item.id,
					})),
				},
			},
		});

		// Optionally, you can clear the cart after creating the order
		await prisma.cartItem.deleteMany({
			where: {
				id: {
					in: cartItemIds,
				},
				userId: session.user.id, // Ensure the cart items belong to the authenticated user
			},
		});
		// Return the created order with its items
		const createdOrder = await prisma.order.findUnique({
			where: {
				id: order.id,
			},
			include: {
				orderItems: {
					include: {
						product: true, // Include product details in the order items
					},
				},
			},
		});

		// update the product stock
		await Promise.all(
			cartItems.map((item) =>
				prisma.product.update({
					where: { id: item.product.id },
					data: {
						quantity: {
							decrement: item.quantity, // Decrease stock by the quantity ordered
						},
					},
				})
			)
		);

		return NextResponse.json(
			{
				message: "Order created successfully",
				createdOrder,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json(
			{
				message: "An error occurred while creating the order",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

// Get request handler for fetching orders
export async function GET(request: NextRequest) {
	try {
		const session = await auth();
		if (!session || !session.user) {
			return redirect("/auth/login");
		}

		const orders = await prisma.order.findMany({
			where: {
				userId: session.user.id, // Fetch orders for the authenticated user
			},
			include: {
				orderItems: {
					include: {
						product: true, // Include product details in the order items
					},
				},
			},
			orderBy: {
				createdAt: "desc", // Order by creation date, most recent first
			},
		});

		return NextResponse.json(
			{ data: orders, message: "User's orders" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching orders:", error);
		return NextResponse.json(
			{
				message: "An error occurred while fetching orders",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

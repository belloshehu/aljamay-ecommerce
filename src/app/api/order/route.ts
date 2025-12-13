import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { UserType } from "@/types/user.types";
import { Resend } from "resend";
import { OrderEmailTemplate } from "@/components/email/order.email.template";
import { OrderType } from "@/types/order.types";

// Post request handler for order creation
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(request)) as UserType;

		const body = await request.json();
		const {
			cartItems: cartItemIds,
			shippingAddressId,
			paymentMethod,
			totalAmount,
		} = body;
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
				userId: user.id, // Ensure the cart items belong to the authenticated user
			},
			include: {
				product: true, // Include product details if needed
			},
		});

		const order = await prisma.order.create({
			data: {
				userId: user.id,
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
				userId: user.id, // Ensure the cart items belong to the authenticated user
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

		if (createdOrder) {
			// Send confirmation email:
			const magicLink =
				"https://aljamay.com/orders/order-redirect/" + createdOrder.id;
			// Send email with the magic link
			const { error } = await resend.emails.send({
				from: "Acme <onboarding@resend.dev>",
				to: [user.email],
				subject: "Order Confirmation",
				react: OrderEmailTemplate({
					order: createdOrder,
					user,
					orderLink: magicLink,
				}),
			});
		}

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
		const user = (await getUserFromSessionOrJWT(request)) as UserType;
		const orders = await prisma.order.findMany({
			where: {
				userId: user.id, // Fetch orders for the authenticated user
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
		return NextResponse.json(
			{
				message: "An error occurred while fetching orders",
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

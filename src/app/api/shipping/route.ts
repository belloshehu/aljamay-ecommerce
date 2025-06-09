import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { ShippingValidationSchemaType } from "@/schemas/shipping.validation.schemas";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json(
				{
					error: "Unauthorized. Please log in.",
				},
				{
					status: 401,
				}
			);
		}
		const body = await req.json();
		const {
			firstName,
			lastName,
			country,
			isDefault,
			city,
			state,
			streetAddress,
			postalCode,
			phoneNumber,
		} = body as ShippingValidationSchemaType;
		if (
			!firstName ||
			!lastName ||
			!country ||
			!city ||
			!state ||
			!streetAddress ||
			!postalCode ||
			isDefault === undefined ||
			!phoneNumber
		) {
			return NextResponse.json(
				{
					error: "All fields are required.",
				},
				{
					status: 400,
				}
			);
		}

		// if there are shipping addresses already and isDefault is true, set all other addresses to false
		const count = await prisma.shippingAddress.count();
		if (isDefault && count > 0) {
			// Here you would typically call a service to update existing addresses
			// to set isDefault to false for all other addresses
			await prisma.shippingAddress.updateMany({
				where: {
					userId: session.user.id,
				},
				data: {
					isDefault: false,
				},
			});
		}

		// Here you would typically call a service to create the shipping address
		const newShippingAddress = await prisma.shippingAddress.create({
			data: {
				...body,
				userId: session.user.id, // Assuming you have a userId field in your ShippingAddressType
			},
		});
		return NextResponse.json(
			{
				message: "Shipping address created successfully.",
				data: newShippingAddress,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		console.error("Error creating shipping address:", error);
		return NextResponse.json(
			{
				error: "An error occurred while processing your request.",
			},
			{
				status: 500,
			}
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user) {
			return NextResponse.json(
				{
					error: "Unauthorized. Please log in.",
				},
				{
					status: 401,
				}
			);
		}

		const shippingAddresses = await prisma.shippingAddress.findMany({
			where: {
				userId: session.user.id,
			},
			orderBy: {
				isDefault: "desc", // Ensure default address comes first
			},
		});

		return NextResponse.json(
			{
				data: shippingAddresses,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "An error occurred while fetching shipping addresses.",
			},
			{
				status: 500,
			}
		);
	}
}

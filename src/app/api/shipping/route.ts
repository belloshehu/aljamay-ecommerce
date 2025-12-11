import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { ShippingValidationSchemaType } from "@/schemas/shipping.validation.schemas";
import { prisma } from "@/lib/prisma";
import { getUserFromSessionOrJWT } from "@/lib/auth";
import { UserType } from "@/types/user.types";
import { StatusCodes } from "http-status-codes";

export async function POST(req: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(req)) as UserType;

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
					status: StatusCodes.BAD_REQUEST,
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
					userId: user.id,
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
				userId: user.id, // Assuming you have a userId field in your ShippingAddressType
			},
		});
		return NextResponse.json(
			{
				message: "Shipping address created successfully.",
				data: newShippingAddress,
			},
			{
				status: StatusCodes.CREATED,
			}
		);
	} catch (error) {
		console.error("Error creating shipping address:", error);
		return NextResponse.json(
			{
				error: "Unknown error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		const user = (await getUserFromSessionOrJWT(req)) as UserType;

		const shippingAddresses = await prisma.shippingAddress.findMany({
			where: {
				userId: user.id,
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
				status: StatusCodes.CREATED,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "An error occurred while fetching shipping addresses.",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

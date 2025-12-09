import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function PATCH(req: NextRequest) {
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
		const id = req.nextUrl.searchParams.get("id");

		if (!id) {
			return NextResponse.json(
				{ error: "Invalid shipping" },
				{ status: StatusCodes.BAD_REQUEST }
			);
		}

		const shippingAddressId = id;
		const body = await req.json();
		const {
			firstName,
			lastName,
			country,
			isDefault,
			isActive,
			city,
			state,
			streetAddress,
			postalCode,
			phoneNumber,
		} = body;
		if (
			!firstName ||
			!lastName ||
			!country ||
			!city ||
			!state ||
			!streetAddress ||
			!postalCode ||
			!phoneNumber ||
			isActive === undefined ||
			isDefault === undefined
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
		// Update the shipping address
		const updatedAddress = await prisma.shippingAddress.update({
			where: {
				id: shippingAddressId,
			},
			data: {
				firstName,
				lastName,
				country,
				isDefault,
				isActive,
				city,
				state,
				streetAddress,
				postalCode,
				phoneNumber,
			},
		});
		return NextResponse.json(
			{
				message: "Shipping address updated successfully.",
				data: updatedAddress,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error updating shipping address:", error);
		return NextResponse.json(
			{
				error: "An error occurred while updating the shipping address.",
			},
			{
				status: 500,
			}
		);
	}
}

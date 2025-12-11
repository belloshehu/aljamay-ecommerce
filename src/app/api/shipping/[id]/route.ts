import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { getUserFromSessionOrJWT } from "@/lib/auth";

export async function PATCH(req: NextRequest) {
	try {
		await getUserFromSessionOrJWT(req);
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
					status: StatusCodes.BAD_REQUEST,
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
				status: StatusCodes.OK,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: "Unknown Error",
			},
			{
				status: StatusCodes.INTERNAL_SERVER_ERROR,
			}
		);
	}
}

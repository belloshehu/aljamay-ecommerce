// Route to update user profile
import { withAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const PATCH = withAuth(async (request, user) => {
	try {
		const body = await request.json();
		const { firstName, lastName, photoUrl, phoneNumber } = body;

		// Update user profile logic here
		// For example, update the user in the database
		// await updateUserProfile(user.id, { name, photoUrl })

		const profile = await prisma.user.update({
			where: { id: user.id },
			data: {
				firstName: firstName ? firstName : user.firstName,
				lastName: lastName ? lastName : user.lastName,
				image: photoUrl ? photoUrl : user.image,
				phoneNumber: phoneNumber ? phoneNumber : user?.phoneNumber,
			},
		});

		return NextResponse.json(
			{ message: "Profile updated successfully", data: profile },
			{ status: StatusCodes.OK }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to update profile", error: error?.message },
			{ status: StatusCodes.INTERNAL_SERVER_ERROR }
		);
	}
});

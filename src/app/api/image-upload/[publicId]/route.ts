import { withAuth } from "@/lib/auth";
import { CloudinaryDestroyesponseType } from "@/types/data.types";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";
import sha1 from "sha1";

export const DELETE = withAuth(async (request: NextRequest, _, params) => {
	try {
		const p = await params;
		const public_id = p?.publicId;
		if (!public_id) {
			return NextResponse.json(
				{ error: "No public_id provided", message: "No image specified" },
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}
		const apiSecret = process.env.CLOUDINARY_API_SECRET;
		const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
		const timestamp = new Date().getTime();
		const rawSignature = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
		const signature = sha1(rawSignature);
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`,
			{
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					public_id,
					api_key: process.env.CLOUDINARY_API_KEY,
					api_secret: process.env.CLOUDINARY_API_SECRET,
					// upload_preset: "clothing",
					timestamp,
					signature,
				}),
			}
		);
		const jsonResponse: CloudinaryDestroyesponseType = await response.json();
		return NextResponse.json(
			{ data: jsonResponse, message: "Image deleted" },
			{ status: StatusCodes.CREATED }
		);
	} catch (error) {
		return NextResponse.json(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Unknown error",
				message: "An error occurred while deleting the image",
			}),
			{ status: 500 }
		);
	}
});

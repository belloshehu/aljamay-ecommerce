import { withAuth } from "@/lib/auth";
import { CloudinaryUploadResponseType } from "@/types/data.types";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

// API rooute for uploading product images to Cloudinary
export const POST = withAuth(async (request: NextRequest) => {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!file) {
			return NextResponse.json(
				{ error: "No image data provided", message: "No image file" },
				{
					status: StatusCodes.BAD_REQUEST,
				}
			);
		}
		const upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET!;
		const cloud_name = process.env.CLOUDINARY_CLOUD_NAME!;
		const data = new FormData();
		data.append("file", file as any);
		data.append("upload_preset", upload_preset);
		data.append("cloud_name", cloud_name);
		const response = await fetch(
			`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
			{
				method: "post",
				body: data,
			}
		);

		const jsonResponse: CloudinaryUploadResponseType = await response.json();
		return NextResponse.json(
			{
				message: "Image uploaded successfully",
				data: jsonResponse,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			JSON.stringify({
				error: error instanceof Error ? error.message : "Unknown error",
				message: "An error occurred while uploading the image",
			}),
			{ status: 500 }
		);
	}
});

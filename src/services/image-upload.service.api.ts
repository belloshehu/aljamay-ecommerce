import { CloudinaryImageUploadFile } from "@/types/cloudinary.types";
import { AxiosInstance } from "axios";

export class ImageUploadServiceAPI {
	static async uploadImage({
		file,
		protectedRequest,
	}: {
		file: CloudinaryImageUploadFile;
		protectedRequest: AxiosInstance;
	}) {
		const { data } = await protectedRequest.post("/image-upload", file);
		return data.data;
	}

	// Delete image by public ID
	static async deleteImage({
		publicId,
		protectedRequest,
	}: {
		publicId: string;
		protectedRequest: AxiosInstance;
	}) {
		const { data } = await protectedRequest.delete(`/image-upload/${publicId}`);
		return data.data;
	}
}

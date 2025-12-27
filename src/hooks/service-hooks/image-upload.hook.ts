import { ImageUploadServiceAPI } from "@/services/image-upload.service.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useImageUpload = () => {
	return useMutation({
		mutationFn: ImageUploadServiceAPI.uploadImage,
		onSuccess: () => {
			toast.success("Image uploaded");
		},
		onError: (error) => {
			toast.error("Failed to upload image");
		},
	});
};

export const useDeleteUploadedImage = () => {
	return useMutation({
		mutationFn: ImageUploadServiceAPI.deleteImage,
		onSuccess: () => {
			toast.success("Image deleted");
		},
		onError: (error) => {
			toast.error("Failed to delete image");
		},
	});
};

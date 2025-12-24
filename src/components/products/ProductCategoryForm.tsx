"use client";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import FormTextarea from "../form-fields/FormTextarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	productCategoryCreateValidationSchema,
	ProductCategoryValidationSchemaType,
} from "@/schemas/product.validation.schema";
import { Form } from "../ui/form";
import FormImagesUploader from "../form-fields/FormImagesUploader";
import useFileUpload from "@/hooks/use-file-upload";
import { toast } from "sonner";
import axios from "axios";

export default function ProductCategoryForm({
	submitBtnText,
	closeDialog,
}: {
	submitBtnText?: string;
	closeDialog?: () => void;
}) {
	const { uploadToCloudinary } = useFileUpload();
	const form = useForm({
		resolver: zodResolver(productCategoryCreateValidationSchema),
	});
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isLoading: isPending },
	} = form;

	const onSubmit = async (data: ProductCategoryValidationSchemaType) => {
		// Handle form submission logic here
		// upload the image and thumbnails to cloudinary
		const image = data.image[0] as any;
		const data_url = image.data_url as string;

		console.log("Uploading main image");

		try {
			const { secure_url } = await uploadToCloudinary(
				data_url,
				"aljamay-products"
			);
			if (!secure_url) {
				toast.error("Failed to upload images");
				return;
			}
			// upload the images to cloudinary

			// create product instance in the database

			const product = await axios.post("/api/product", {
				name: data.name,
				image: secure_url,
			});
			toast.success("Product created successfully");
			reset();
			closeDialog?.();
		} catch (error) {
			console.log(error);
			toast.error("Failed to upload images or create product");
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full flex flex-col space-y-4"
				// action={formAction}
				id="product-category-form"
			>
				{/* product form body */}
				<FormInputField
					control={control}
					name="name"
					type="text"
					label="Name"
					id="name"
					placeholder="Product's name"
					errorMessage={errors.name?.message}
				/>

				<FormImagesUploader
					control={control}
					name="image"
					label="Product Image"
					maxImageSize={5000000}
					className="w-full h-[100px] justify-start items-start"
					previewHeight={300}
					previewWidth={250}
					errorMessage={errors.image?.message as string}
				/>

				<FormTextarea
					control={control}
					name="description"
					label="Description"
					id="description"
					placeholder="Product's description"
					errorMessage={errors.description?.message}
					rows={8}
				/>

				<div className="my-5 w-full flex justify-end items-center gap-4">
					<Button
						className="bg-gradient-to-br from-green-700 to-cyan-700"
						type="submit"
						form="product-form"
						disabled={isPending}
					>
						{isPending ? "Creating..." : submitBtnText || "Create Product"}
					</Button>
					<Button variant="outline" disabled={isPending} onClick={closeDialog}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
}

"use client";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import FormTextarea from "../form-fields/FormTextarea";
import FormSelect from "../form-fields/FormSelect";
import { productCategories } from "@/constants/data";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	productCreateValidationSchema,
	ProductCreateValidationSchemaType,
} from "@/schemas/product.validation.schema";
import { Form } from "../ui/form";
import FormImagesUploader from "../form-fields/FormImagesUploader";
import useFileUpload from "@/hooks/use-file-upload";
import { toast } from "sonner";
import axios from "axios";

export default function ProductForm({
	submitBtnText,
	closeDialog,
}: {
	submitBtnText?: string;
	closeDialog?: () => void;
}) {
	const { uploadToCloudinary } = useFileUpload();
	const form = useForm({
		resolver: zodResolver(productCreateValidationSchema),
	});
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isLoading: isPending },
	} = form;

	const onSubmit = async (data: ProductCreateValidationSchemaType) => {
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
			const thumbnails = [];
			console.log("uploading thumbnails", data.thumbnails);
			if (data.thumbnails) {
				for (let i = 0; i < data?.thumbnails?.length!; i++) {
					const image = data.thumbnails[i];
					const data_url = image.data_url as string;
					const { secure_url } = await uploadToCloudinary(
						data_url,
						"aljamay-products"
					);
					thumbnails.push(secure_url);
				}
				if (thumbnails.length === 0) {
					toast.error("Failed to upload thumbnails");
				}
			}

			// create product instance in the database

			const product = await axios.post("/api/product", {
				name: data.name,
				price: data.price,
				quantity: data.quantity,
				discount: data.discount,
				description: data.description,
				category: data.category,
				thumbnails: thumbnails,
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
				id="product-form"
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

				<FormInputField
					control={control}
					name="price"
					label="Price"
					id="price"
					type="number"
					placeholder="Product's price"
					errorMessage={errors.price?.message}
				/>

				<FormInputField
					control={control}
					name="quantity"
					label="Quantity"
					id="quantity"
					type="number"
					placeholder="Product's quantity"
					errorMessage={errors.quantity?.message}
				/>

				<FormInputField
					control={control}
					name="discount"
					label="Discount"
					id="discount"
					type="number"
					placeholder="Product's discount"
					errorMessage={errors.discount?.message}
				/>
				<FormImagesUploader
					control={control}
					name="image"
					label="Product Image"
					maxImageSize={1000000}
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
				<FormImagesUploader
					control={control}
					name="thumbnails"
					label="Product thumbnails"
					maxImageSize={1000000}
					className="w-full h-[100px] justify-start items-start"
					previewHeight={200}
					previewWidth={200}
					multiple={true}
					maxNumber={5}
				/>
				<FormSelect
					options={productCategories}
					control={control}
					label="Category"
					placeholder="Select product category"
					register={register("category")}
					className="w-full"
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

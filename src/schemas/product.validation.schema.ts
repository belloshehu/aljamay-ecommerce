import { productCategories } from "@/constants/data";
import z, { array } from "zod";

const productCatoriesEnum = productCategories.map(
	(item) => item.value
) as string[];
const producCategoryAndFilterSchema = z.object({
	category: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
	sortBy: z.enum(["price", "rating", "name"]).optional(),
});

export type ProductCategoryAndFilterSchemaType = z.infer<
	typeof producCategoryAndFilterSchema
>;

const productCreateValidationSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	price: z.coerce
		.number()
		.min(0, { message: "Price must be a positive number" })
		.max(100000, { message: "Price must be less than 100,000" }),
	discount: z.coerce
		.number()
		.min(0, { message: "Discount must be a positive number" })
		.default(0),
	description: z.string().min(1, { message: "Description is required" }),
	category: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
	image: z.any({ message: "Image is required" }),
	thumbnails: z.any().array().default([]),
	quantity: z.coerce.number().default(1),
});
export type ProductCreateValidationSchemaType = z.infer<
	typeof productCreateValidationSchema
>;

// Validation schema for Product category

const productCategoryCreateValidationSchema = z.object({
	name: z.enum(productCatoriesEnum as [string, ...string[]]).default("all"),
	image: z.any({ message: "Image is required" }),
	description: z.string().min(1, { message: "Description is required" }),
});

export type ProductCategoryValidationSchemaType = z.infer<
	typeof productCategoryCreateValidationSchema
>;

export {
	producCategoryAndFilterSchema,
	productCreateValidationSchema,
	productCategoryCreateValidationSchema,
};

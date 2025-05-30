import { productCategories } from "@/constants/data";
import z from "zod";

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
export default producCategoryAndFilterSchema;

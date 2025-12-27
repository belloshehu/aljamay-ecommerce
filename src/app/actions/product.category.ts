'"use server";';

import { prisma } from "@/lib/prisma";
import { ProductCategoryType } from "@/types/product-category.types";

export async function getProductCategories(
	limit = 10,
	offset = 0
): Promise<
	ProductCategoryType[] | { message: string; error?: string; status: number }
> {
	try {
		const productCategories = await prisma.productCategory.findMany({
			take: limit,
			skip: offset,
		});
		return productCategories;
	} catch (error: any) {
		return {
			message: `Failed to fetch product categorys:`,
			error: error?.message,
			status: 500,
		};
	}
}

// get productCategory by id
export async function getProductCategoryById(id: string) {
	try {
		const productCategory = await prisma.productCategory.findUnique({
			where: { id },
		});
		if (!productCategory) {
			return {
				message: "Product category not found",
				status: 404,
			};
		}
		return productCategory;
	} catch (error: any) {
		return {
			message: `Failed to fetch product categorys:`,
			error: error?.message,
			status: 500,
		};
	}
}

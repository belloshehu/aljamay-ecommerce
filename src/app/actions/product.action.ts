'"use server";';

import { prisma } from "@/lib/prisma";
import { ProductType } from "@/types/product.types";

export async function getProducts(
	limit = 10,
	offset = 0,
	category = ""
): Promise<
	ProductType[] | { message: string; error?: string; status: number }
> {
	try {
		const products = await prisma.product.findMany({
			take: limit,
			skip: offset,
			where: {
				category: category ? { equals: category } : undefined,
			},
		});
		return products;
	} catch (error: any) {
		return {
			message: `Failed to fetch products:`,
			error: error?.message,
			status: 500,
		};
	}
}

// get product by id
export async function getProductById(id: string) {
	try {
		const product = await prisma.product.findUnique({
			where: { id },
		});
		if (!product) {
			return {
				message: "Product not found",
				status: 404,
			};
		}
		return product;
	} catch (error: any) {
		return {
			message: `Failed to fetch products:`,
			error: error?.message,
			status: 500,
		};
	}
}

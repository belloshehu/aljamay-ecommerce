export async function getProducts(limit = 10, offset = 0, category = "") {
	try {
		const { prisma } = await import("@/lib/prisma");
		const products = await prisma.product.findMany({
			take: limit,
			skip: offset,
			where: {
				category: category ? { equals: category } : undefined,
			},
		});
		return products;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw new Error(`Failed to fetch products`);
	}
}

// get product by id
export async function getProductById(id: string) {
	try {
		const { prisma } = await import("@/lib/prisma");
		const product = await prisma.product.findUnique({
			where: { id },
		});
		if (!product) {
			throw new Error("Product not found");
		}
		return product;
	} catch (error) {
		console.error("Error fetching product by ID:", error);
		throw new Error("Failed to fetch product by ID");
	}
}

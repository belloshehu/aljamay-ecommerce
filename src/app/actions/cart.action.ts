export async function getCartItems() {
	try {
		const { prisma } = await import("@/lib/prisma");
		const cartItems = await prisma.cartItem.findMany({
			include: {
				product: true,
			},
		});
		return cartItems;
	} catch (error) {
		console.error("Error fetching cart items:", error);
		throw new Error("Failed to fetch cart items");
	}
}

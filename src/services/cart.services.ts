"use client";
import { CartItemResponseType } from "@/types/cart.types";
import axios from "axios";

class CartServiceAPI {
	static async getCartItems() {
		const { data } = await axios.get<CartItemResponseType>("/api/cart");
		return data.data;
	}

	static async addToCart({
		productId,
		quantity,
	}: {
		productId: string;
		quantity: number;
	}) {
		const { data } = await axios.post("/api/cart", {
			productId,
			quantity,
		});
		return data.data;
	}

	static async removeFromCart({ productId }: { productId: string }) {
		const { data } = await axios.delete(`/api/cart/${productId}`);
		return data.data;
	}

	static async updateCartItemQuantity({
		cartItemId,
		quantity,
	}: {
		cartItemId: string;
		quantity: number;
	}) {
		const { data } = await axios.patch(`/api/cart/${cartItemId}`, {
			quantity,
		});
		return data.data;
	}

	static async clearCart() {
		const { data } = await axios.delete("/api/cart");
		return data.data;
	}
}

export default CartServiceAPI;

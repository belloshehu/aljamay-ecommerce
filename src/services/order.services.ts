import {
	OrderResponseType,
	SingleOrderResponseType,
} from "@/types/order.types";
import axios from "axios";

class OrderServiceAPI {
	// This service handles order-related API calls
	static async getOrders() {
		const { data } = await axios.get<OrderResponseType>("/api/order");
		return data.data;
	}

	// This method creates a new order with the provided details
	static async createOrder({
		cartItems,
		shippingAddressId,
		paymentMethod,
		totalAmount,
	}: {
		cartItems: string[];
		shippingAddressId: string;
		paymentMethod: string;
		totalAmount: number;
	}) {
		const { data } = await axios.post<SingleOrderResponseType>("/api/order", {
			cartItems,
			shippingAddressId,
			paymentMethod,
			totalAmount,
		});
		return data.data;
	}

	static async getOrderById({ orderId }: { orderId: string }) {
		const { data } = await axios.get<SingleOrderResponseType>(
			`/api/order/${orderId}`
		);
		return data.data;
	}

	static async updateOrderStatus({
		orderId,
		status,
	}: {
		orderId: string;
		status: string;
	}) {
		const { data } = await axios.patch(`/api/order/${orderId}`, {
			status,
		});
		return data.data;
	}
}

export default OrderServiceAPI;

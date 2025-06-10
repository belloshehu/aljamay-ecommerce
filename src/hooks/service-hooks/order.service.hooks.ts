import OrderServiceAPI from "@/services/order.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: OrderServiceAPI.createOrder,

		onSuccess: () => {
			toast.success("Order created successfully:");
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
		onError: () => {
			toast.error("Error creating order");
		},
	});
};

export const useGetOrders = () => {
	return useQuery({
		queryKey: ["orders"],
		queryFn: async () => OrderServiceAPI.getOrders(),
	});
};

export const useGetOrderById = (orderId: string) => {
	return useQuery({
		queryKey: ["order", orderId],
		queryFn: async () => OrderServiceAPI.getOrderById({ orderId }),
	});
};

export const useUpdateOrderStatus = (orderId: string) => {
	const queryClient = useQueryClient();

	if (!orderId) {
		throw new Error("Order ID is required for updating status");
	}

	return useMutation({
		mutationFn: OrderServiceAPI.updateOrderStatus,
		onSuccess: () => {
			toast.success("Order status updated successfully");
			queryClient.invalidateQueries({ queryKey: ["orders", orderId] });
		},
		onError: () => {
			toast.error("Error updating order status");
		},
	});
};

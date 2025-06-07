import CartServiceAPI from "@/services/cart.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCartItems = () => {
	return useQuery({
		queryKey: ["cartItems"],
		queryFn: async () => {
			return CartServiceAPI.getCartItems();
		},
		refetchOnWindowFocus: false, // Optional: Prevent refetching on window focus
		staleTime: 1000 * 60 * 5, // Optional: Cache for 5 minutes
	});
};

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: CartServiceAPI.addToCart,
		onSuccess: () => {
			toast.success("Item added to cart successfully!");
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
		onError: (error) => {
			toast.error(
				`Error adding to cart: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		},
	});
};

// remove item from cart
export const useRemoveFromCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: CartServiceAPI.removeFromCart,
		onSuccess: () => {
			toast.success("Item removed from cart successfully!");
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
		onError: (error) => {
			toast.error(
				`Error removing from cart: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		},
	});
};

// update cart item quantity
export const useUpdateCartItemQuantity = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: CartServiceAPI.updateCartItemQuantity,
		onSuccess: () => {
			toast.success("Cart item quantity updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["cartItems"] });
		},
		onError: (error) => {
			toast.error(
				`Error updating cart item quantity: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		},
	});
};

import ProductServiceAPI from "@/services/product.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetProducts = ({ limit = 20, offset = 0, search = "" }) => {
	return useQuery({
		queryKey: ["products", { limit, offset, search }],
		queryFn: async () =>
			ProductServiceAPI.getProducts({ limit, offset, search }),
	});
};

export const useGetProductById = (productId: string) => {
	return useQuery({
		queryKey: ["product", productId],
		queryFn: async () => ProductServiceAPI.getSingleProduct({ productId }),
	});
};

export const useDeleteProduct = (productId: string) => {
	const queryClient = useQueryClient();

	// Ensure that the productId is provided
	if (!productId) {
		throw new Error("Product ID is required for deletion");
	}
	return useMutation({
		mutationKey: ["deleteProduct", productId],
		mutationFn: ProductServiceAPI.deleteProductById,
		onSuccess: () => {
			// Optionally, you can invalidate the product query to refetch the list of products
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

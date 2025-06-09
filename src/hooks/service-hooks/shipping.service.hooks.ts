import ShippingServiceAPI from "@/services/shipping.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetAllShippingAdressesByUser = () => {
	return useQuery({
		queryFn: async () => ShippingServiceAPI.getShippingAddressesByUser(),
		queryKey: ["shipping-address"],
	});
};

export const useGetAllShippingAdress = ({
	shippingAddressId,
}: {
	shippingAddressId: string;
}) => {
	return useQuery({
		queryFn: async () =>
			ShippingServiceAPI.getShippingAddress({ shippingAddressId }),
		queryKey: ["shipping-address"],
	});
};

export const useCreateShippingAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ShippingServiceAPI.createShippingAddress,
		onSuccess: () => {
			toast.success("Added shipping address");
			queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
		},
		onError: (error: AxiosError) => {
			toast.error(error.message || "Failed to add shipping address");
		},
	});
};

export const useDeleteShippingAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ShippingServiceAPI.deleteShippingAddress,
		onSuccess: () => {
			toast.success("Delete shipping address");
			queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
		},
		onError: (error: AxiosError) => {
			toast.error(error.message || "Failed to delete shipping address");
		},
	});
};

export const useUpdateShippingAddress = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ShippingServiceAPI.updateShippingAddress,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["shipping-address"] });
			toast.success("Updated shipping address");
		},
		onError: (error: AxiosError) => {
			toast.error(error.message || "Failed to update shipping address");
		},
	});
};

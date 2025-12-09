import FlutterwaveServiceAPI from "@/services/flutterwave.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyPayment = () => {
	return useMutation({
		mutationFn: FlutterwaveServiceAPI.verifyPayment,
		onSuccess() {
			toast.error("Failed to verify transaction");
		},
		onError: () => {
			toast.error("Payment failed");
		},
	});
};

"use client";
import {
	useFlutterwaveCheckout,
	useCheckoutStatus,
} from "flutterwave-next/client";
import { FlutterwaveConfigType } from "@/config/flutterwave.config";

// Custom hook to handle payment using multiple payment gateways
export default function usePayment() {
	const { onClose } = useCheckoutStatus();
	const useCustomFlutterwave = (config: FlutterwaveConfigType) => {
		const { initiatePayment } = useFlutterwaveCheckout(config);
		return { initiatePayment, closePaymentModal: onClose };
	};

	return { useCustomFlutterwave };
}

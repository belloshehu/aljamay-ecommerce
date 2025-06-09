"use client";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { FlutterwaveConfigType } from "@/config/flutterwave.config";

// Custom hook to handle payment using multiple payment gateways
export default function usePayment() {
  const useCustomFlutterwave = (config: FlutterwaveConfigType) => {
    const handleFlutterPayment = useFlutterwave(config);
    return { handleFlutterPayment, closePaymentModal };
  };

  return { useCustomFlutterwave };
}

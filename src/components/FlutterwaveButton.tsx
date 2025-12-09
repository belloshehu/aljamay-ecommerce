"use client";

import { useFlutterwave } from "@/hooks/useFlutterwave";
import type { FlutterwaveCheckoutConfig } from "@/types/flutterwave";

interface FlutterwaveButtonProps {
	config: FlutterwaveCheckoutConfig;
	children?: React.ReactNode;
}

export default function FlutterwaveButton({
	config,
	children,
}: FlutterwaveButtonProps) {
	const { payWithFlutterwave } = useFlutterwave();

	const handleClick = () => payWithFlutterwave(config);

	return <button onClick={handleClick}>{children || "Pay Now"}</button>;
}

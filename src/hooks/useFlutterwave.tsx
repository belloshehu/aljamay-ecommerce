"use client";

import { useEffect } from "react";
import type { FlutterwaveCheckoutConfig } from "@/types/flutterwave";

export function useFlutterwave() {
	useEffect(() => {
		// Load Flutterwave script once
		if (!window.FlutterwaveCheckout) {
			const script = document.createElement("script");
			script.src = "https://checkout.flutterwave.com/v3.js";
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	const payWithFlutterwave = (config: FlutterwaveCheckoutConfig) => {
		if (!window.FlutterwaveCheckout) {
			console.error("Flutterwave script not loaded yet");
			return;
		}
		window.FlutterwaveCheckout(config);
	};

	return { payWithFlutterwave };
}

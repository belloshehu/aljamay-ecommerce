"use client";

import { useEffect } from "react";

export function useFlutterwaveInline() {
	useEffect(() => {
		// Load Flutterwave script once
		const script = document.createElement("script");
		script.src = "https://checkout.flutterwave.com/v3.js";
		script.async = true;
		document.body.appendChild(script);
	}, []);

	const payWithFlutterwave = (config: any) => {
		// @ts-ignore global from script
		FlutterwaveCheckout({
			...config,
			callback: (response: any) => {
				config.callback?.(response);
			},
			onclose: () => {
				config.onclose?.();
			},
		});
	};

	return { payWithFlutterwave };
}

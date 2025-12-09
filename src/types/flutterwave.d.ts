declare module "flutterwave-next/client";

declare module "flutterwave-next" {
	export interface FlutterwaveResponse {
		amount: number;
		currency: "NGN" | "USD";
		customer: {
			email: string;
			name: string;
			phone_number: string;
		};
		flw_ref: string;
		transaction_id: string | number;
		status: string;
		tx_ref: string;
	}
}

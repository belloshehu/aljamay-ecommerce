declare global {
	interface Window {
		FlutterwaveCheckout?: (config: FlutterwaveCheckoutConfig) => void;
	}
}

export interface FlutterwaveCustomer {
	email: string;
	name?: string;
	phone_number?: string;
}

export interface FlutterwaveCheckoutConfig {
	public_key: string;
	tx_ref: string;
	amount: number;
	currency: "NGN" | "USD";
	payment_options?: string;
	customer: FlutterwaveCustomer;
	callback?: (response: FlutterwaveResponse) => void;
	onclose?: () => void;
	meta?: Record<string, any>;
	customizations?: {
		title?: string;
		description?: string;
		logo?: string;
	};
}

export interface FlutterwaveResponse {
	status: string;
	message?: string;
	amount: number;
	currency: "NGN" | "USD";
	tx_ref: string;
	flw_ref: string;
	transaction_id: string | number;
	customer: FlutterwaveCustomer;
	charged_amount?: number;
	app_fee?: number;
	processor_response?: string;
	payment_type?: string;
	created_at?: string;
}

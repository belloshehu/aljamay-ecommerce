import { FlutterwaveResponse } from "@/types/flutterwave";
import axios from "axios";

class FlutterwaveServiceAPI {
	static async verifyPayment({ id }: { id: number }) {
		const { data } = await axios.post<{
			success: boolean;
			data: FlutterwaveResponse;
		}>("/api/flutterwave/verify", { id });
		return data;
	}
}

export default FlutterwaveServiceAPI;

import { ShippingValidationSchemaType } from "@/schemas/shipping.validation.schemas";
import {
	ShippingAddressResponseType,
	SingleShippingAddressResponseType,
} from "@/types/shipping.types";
import axios from "axios";

class ShippingServiceAPI {
	// service method to fetch all shipping addresses by a user
	static async getShippingAddressesByUser() {
		const { data } = await axios.get<ShippingAddressResponseType>(
			"/api/shipping/"
		);
		return data.data;
	}

	// service method to fetch single address by id
	static async getShippingAddress({
		shippingAddressId,
	}: {
		shippingAddressId: string;
	}) {
		const { data } = await axios.get<SingleShippingAddressResponseType>(
			"/api/shipping/" + shippingAddressId
		);
		return data.data;
	}

	// service method to get user's default shipping address
	static async getDefaultShippingAddress() {
		const { data } = await axios.get<SingleShippingAddressResponseType>(
			"/api/shipping/"
		);
		return data.data;
	}

	// service method to create/add new shipping address
	static async createShippingAddress({
		payload,
	}: {
		payload: ShippingValidationSchemaType;
	}) {
		const { data } = await axios.post<SingleShippingAddressResponseType>(
			"/api/shipping/",
			payload
		);
		return data.data;
	}

	// service method to update an existing shipping address
	static async updateShippingAddress({
		payload,
		shippingAddressId,
	}: {
		payload: ShippingValidationSchemaType;
		shippingAddressId: string;
	}) {
		const { data } = await axios.patch<SingleShippingAddressResponseType>(
			"/api/shipping/" + shippingAddressId,
			payload
		);
		return data.data;
	}

	// service method to delete shipping address by id
	static async deleteShippingAddress({
		shippingAddressId,
	}: {
		shippingAddressId: string;
	}) {
		const { data } = await axios.delete<SingleShippingAddressResponseType>(
			"/api/shipping/" + shippingAddressId
		);
		return data.data;
	}
}

export default ShippingServiceAPI;

import { ProductType } from "@/types/product.types";
import { ResponseType } from "@/types/response.types";

export interface CartItemType {
	product: ProductType;
	quantity: number;
	id: string;
}

export interface CartItemResponseType extends ResponseType<CartItemType[]> {
	data: CartItemType[];
}

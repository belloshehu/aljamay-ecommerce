import { ProductType } from "./product.types";

export interface CartItemType {
	product: ProductType;
	quantity: number;
	id: string;
}

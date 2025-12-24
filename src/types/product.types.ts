import { ResponseType } from "@/types/response.types";
import { Product } from "@prisma/client";

export interface ProductType extends Product {
	// id: string;
	// name: string;
	// image: string;
	// thumbnails: string[];
	// description: string;
	// price: number;
	// discount: number;
	// createdAt: Date;
	// updatedAt: Date;
	// reviews: Review[];
	// orderItems: OrderItem[];
}

export interface ProductResponseType extends ResponseType<ProductType[]> {
	data: ProductType[];
}

export interface SingleProductResponseType extends ResponseType<ProductType> {
	data: ProductType;
}

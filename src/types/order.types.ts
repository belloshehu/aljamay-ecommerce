import { Order } from "@prisma/client";
import { ProductType } from "./product.types";
import { ResponseType } from "./response.types";
import { UserType } from "./user.types";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentMethod = "CREDIT_CARD" | "USSD" | "BANK_TRANSFER";
export type OrderStatus =
	| "PENDING"
	| "COMPLETED"
	| "CANCELLED"
	| "SHIPPED"
	| "DELIVERED";

export interface OrderType extends Order {
	orderItems: OrderItemType[];
	user: UserType;
}

export interface OrderItemType {
	id: string;
	orderId: string;
	product: ProductType;
	quantity: number;
	price: number; // Price at the time of order
	createdAt?: Date;
	updatedAt?: Date;
	orderNumber: string;
}

export interface OrderResponseType extends ResponseType<OrderType[]> {
	data: OrderType[];
}

export interface SingleOrderResponseType extends ResponseType<OrderType> {
	data: OrderType;
}

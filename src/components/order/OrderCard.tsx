/*
 * A card component that represents an order with product items that make up the order
 */

import { OrderType } from "@/types/order.types";
import OrderListHeader from "./OrderListHeader";
import OrderItem from "./OrderItem";

interface OrderCardProps {
	order: OrderType;
}
const OrderCard = ({ order }: OrderCardProps) => {
	return (
		<div>
			<OrderListHeader
				status={order.status}
				createdAt={order?.createdAt?.toString()!}
				OrderItemsCount={order.orderItems.length}
				totalAmount={order.totalAmount}
				key={order.id}
				user={order.user}
			/>

			<section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 my-5">
				{order.orderItems.map((orderItem) => (
					<OrderItem {...orderItem} status={order.status} key={orderItem.id} />
				))}
			</section>
		</div>
	);
};

export default OrderCard;

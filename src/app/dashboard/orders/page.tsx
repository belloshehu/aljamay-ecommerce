"use client";
import { useGetOrders } from "@/hooks/service-hooks/order.service.hooks";
import Loader from "@/components/Loader";
import OrderItem from "@/components/order/OrderItem";
import OrderListHeader from "@/components/order/OrderListHeader";

export default function OrdersPage() {
	const { isPending, data } = useGetOrders();

	if (isPending) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<Loader message="Loading orders" />
				</div>
			</section>
		);
	}
	if (!data || data.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						No orders found
					</h1>
				</div>
			</section>
		);
	}

	return (
		<div className="w-full flex-col gap-5">
			{/* <h1 className="text-2xl font-bold mb-4">Users ({users.length})</h1> */}
			{/* Add more dashboard content here */}
			{data.map((item) => (
				<>
					<OrderListHeader
						status={item.status}
						createdAt={item?.createdAt?.toString()!}
						OrderItemsCount={item.orderItems.length}
						totalAmount={item.totalAmount}
						key={item.id}
					/>

					<section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 my-5">
						{item.orderItems.map((orderItem) => (
							<OrderItem
								{...orderItem}
								status={item.status}
								key={orderItem.id}
							/>
						))}
					</section>
				</>
			))}
		</div>
	);
}

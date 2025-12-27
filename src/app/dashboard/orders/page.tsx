import OrderCard from "@/components/order/OrderCard";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
	const orders = await prisma.order.findMany({
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
			user: true,
		},
	});
	if (!orders || orders.length === 0) {
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
			{orders.map((order) => {
				if (order.orderItems.length === 0) return null;
				return <OrderCard order={order} />;
			})}
		</div>
	);
}

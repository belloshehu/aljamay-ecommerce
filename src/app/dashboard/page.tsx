import DashboardMetric from "@/components/dashboard/DashboardMetric";
import PageWrapper from "@/components/PageWrapper";
import { auth } from "../../../auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
	const session = await auth();
	if (!session || !session.user) {
		return (
			<PageWrapper>
				<div className="text-center">
					<h1 className="text-2xl font-bold">Access Denied</h1>
					<p className="mt-4">You must be logged in to view this page.</p>
				</div>
			</PageWrapper>
		);
	}
	if (session.user.role === "ADMIN") {
		const products = await prisma.product.count();
		const ordersCount = await prisma.order.count();
		const cancelledOrdersCount = await prisma.order.count({
			where: {
				status: "CANCELLED",
			},
		});
		const usersCount = await prisma.user.count({
			where: {
				role: "USER",
			},
		});
		const totalRevenue = await prisma.order.aggregate({
			_sum: {
				totalAmount: true,
			},
			where: {
				NOT: {
					status: "CANCELLED",
				},
			},
		});

		return (
			<PageWrapper>
				<div className="bg-[#ADF802] mb-10 shadow-md w-full p-2 py-5 items-center rounded-md">
					<h1 className="font-bold text-4xl">
						<span className="line-through">N</span>
						{totalRevenue._sum.totalAmount || 0}
					</h1>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
					<DashboardMetric title="Total orders" metric={ordersCount} />
					<DashboardMetric title="Total users" metric={usersCount} />
					<DashboardMetric
						title="Total revenue (Naira)"
						metric={totalRevenue?._sum?.totalAmount || 0}
					/>
					<DashboardMetric title="Total products" metric={products} />
					<DashboardMetric
						title="Cancelled orders"
						metric={cancelledOrdersCount}
					/>
				</div>
				{/* Add more dashboard content here */}
			</PageWrapper>
		);
	}
	const cartItemsCount = await prisma.cartItem.count({
		where: {
			user: {
				id: session.user?.id,
			},
		},
	});

	const totalOrders = await prisma.order.aggregate({
		_sum: {
			totalAmount: true,
		},
		where: {
			NOT: {
				status: "CANCELLED",
			},
			user: {
				id: session.user.id,
			},
		},
	});

	const ordersCount = await prisma.order.count();

	return (
		<PageWrapper>
			<h1 className="font-bold">{totalOrders._sum.totalAmount || 0}</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
				<DashboardMetric title="Total orders" metric={ordersCount} />
				<DashboardMetric title="Total carts Items" metric={cartItemsCount} />
			</div>
			{/* Add more dashboard content here */}
		</PageWrapper>
	);
}

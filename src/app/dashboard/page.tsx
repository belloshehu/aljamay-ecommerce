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
		return (
			<PageWrapper>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
					<DashboardMetric title="Total orders" metric={10} />
					<DashboardMetric title="Total users" metric={100} />
					<DashboardMetric title="Total revenue" metric={5000} />
					<DashboardMetric title="Total products" metric={products} />
					<DashboardMetric title="Cancelled orders" metric={50} />
				</div>
				{/* Add more dashboard content here */}
			</PageWrapper>
		);
	}
	const cartItemsCount = await prisma.cartItem.count();
	return (
		<PageWrapper>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
				<DashboardMetric title="Total orders" metric={10} />
				<DashboardMetric title="Total carts Items" metric={cartItemsCount} />
				<DashboardMetric title="Cancel Orders" metric={5000} />
			</div>
			{/* Add more dashboard content here */}
		</PageWrapper>
	);
}

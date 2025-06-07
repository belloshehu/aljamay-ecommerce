import CheckoutSidebar from "@/components/products/CheckoutSidebar";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";
import React, { ReactNode } from "react";

export default function ProductPageLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="w-full flex flex-col items-center justify-center gap-4 md:px-2">
			<ProductCategoryHeader />
			<div className="w-full grid grid-cols-1 md:grid-cols-5 gap-8">
				<div className="col-span-4">{children}</div>
				<CheckoutSidebar className="order-1 md:order-2" />
			</div>
		</div>
	);
}

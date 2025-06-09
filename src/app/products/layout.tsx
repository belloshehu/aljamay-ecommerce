"use client";
import OrderSummarySidebar from "@/components/order/OrderSummarySidebar";
import CheckoutSidebar from "@/components/products/CheckoutSidebar";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

export default function ProductPageLayout({
	children,
}: {
	children: ReactNode;
}) {
	const isCheckoutPage = usePathname() === "/products/checkout";
	return (
		<div className="w-full flex flex-col items-center justify-center gap-4 md:px-2">
			<ProductCategoryHeader />
			<div className="w-full grid grid-cols-1 md:grid-cols-7 gap-8">
				<div className="col-span-5">{children}</div>
				{isCheckoutPage ? <OrderSummarySidebar /> : <CheckoutSidebar />}
			</div>
		</div>
	);
}

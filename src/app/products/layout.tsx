import ProductCategoryHeader from "@/components/products/ProductCategoryHearder";
import React, { ReactNode } from "react";

export default function ProductPageLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="w-full flex flex-col items-center justify-center gap-4 ">
			<ProductCategoryHeader />
			{children}
		</div>
	);
}

import { ReactNode } from "react";
import { auth } from "../../../auth";
import ProductPageSidebar from "@/components/products/ProductPageSideBar";
import { Session } from "next-auth";

export default async function ProductPageLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await auth();
	return (
		<div className="w-full flex flex-col items-center justify-center gap-4 md:px-2">
			{/* <ProductCategoryHeader /> */}
			<div className="w-full grid grid-cols-1 md:grid-cols-7 gap-8">
				<div className="col-span-5">{children}</div>
				<ProductPageSidebar session={session as Session} />
			</div>
		</div>
	);
}

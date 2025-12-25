import { ProductType } from "@/types/product.types";
import Product from "./Product";
import Loader from "../Loader";
import { ProductListSkeleton } from "./skeletons/ProductSkeleton";
import { ScrollArea } from "../ui/scroll-area";

export default function ProductList({
	products,
	isLoading = false,
}: {
	className?: string;
	products: ProductType[];
	isLoading?: boolean;
}) {
	if (isLoading) return <ProductListSkeleton />;
	if (!products || products.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl text-red-500">No products available</h1>
				</div>
			</section>
		);
	}
	return (
		// <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full p-5 md:px-20 mb-10">
		<ScrollArea className="w-full ">
			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full gap-2 p-2">
				{products.map((product: ProductType) => (
					<Product product={{ ...product }} key={product.id} />
				))}
			</div>
		</ScrollArea>
	);
}

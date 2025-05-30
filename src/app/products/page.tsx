import { getProducts } from "@/app/actions/product.action";
import { ProductType } from "@/types/product.types";
import Product from "@/components/products/Product";

export default async function ProductListPage() {
	const products = await getProducts(40, 0, "");

	if (!products || products.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl text-red-500">Product not found</h1>
				</div>
			</section>
		);
	}

	return (
		<section className="w-full p-5 md:p-20">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products.map((product: ProductType) => (
					<Product product={product} key={product.id} />
				))}
			</div>
		</section>
	);
}

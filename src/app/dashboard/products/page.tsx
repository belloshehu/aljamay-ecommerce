import Product from "@/components/products/Product";
import { getProducts } from "@/app/actions/product.action";
import { ProductType } from "@/types/product.types";

export default async function ProductsPage() {
	const products = await getProducts(20, 0, "");
	if (!products || products.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex flex-col  gap-10 justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						Products not found
					</h1>
					<button className="bg-black text-white p-2 px-4">Add product</button>
				</div>
			</section>
		);
	}

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-4">Products ({products.length})</h1>
			{/* Add more dashboard content here */}
			<section className="w-full">
				<ul className="w-full">
					{products.map((product: ProductType) => (
						<Product product={product} key={product.id} />
					))}
				</ul>
			</section>
		</div>
	);
}

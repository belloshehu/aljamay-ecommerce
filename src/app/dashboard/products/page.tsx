import Product from "@/components/products/Product";
import { getProducts } from "@/app/actions/product.action";
import { ProductType } from "@/types/product.types";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";

export default async function ProductsPage() {
	const products = (await getProducts(20, 0, "")) as ProductType[] | null;

	if (!products) {
		return (
			<section className="w-full p-2 flex flex-col justify-start">
				<ProductCategoryHeader />
				<div className="flex flex-col  gap-10 justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						No products yet
					</h1>
				</div>
			</section>
		);
	}
	if (products?.length === 0) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl text-red-500">No products available</h1>
				</div>
			</section>
		);
	}
	return (
		<div className="w-full">
			<ProductCategoryHeader />
			<h1 className="text-2xl font-bold mb-4">Products ({products.length})</h1>
			{/* Add more dashboard content here */}
			<section className="w-full">
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products.map((product: ProductType) => (
						<Product product={{ ...product }} key={product.id} />
					))}
				</div>
			</section>
		</div>
	);
}

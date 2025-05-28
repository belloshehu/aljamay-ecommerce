import PageWrapper from "@/components/PageWrapper";
import Product from "@/components/products/Product";
import { getProducts } from "@/app/actions/product.action";

type Params = Promise<{ category: string }>;

export default async function ProductPage(props: { params: Params }) {
	const { category } = await props.params;
	const products = await getProducts(20, 0, category);

	if (!products) {
		return (
			<section className="w-full p-5 md:p-20">
				<div className="flex justify-center items-center min-h-[50vh]">
					<h1 className="text-xl font-semibold text-red-500">
						Products not found
					</h1>
				</div>
			</section>
		);
	}

	return (
		<PageWrapper>
			<h1>Products</h1>
			<section className="w-full p-5 md:p-20">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{products.map((product) => (
						<Product key={product.id} product={product} />
					))}
				</div>
			</section>
		</PageWrapper>
	);
}

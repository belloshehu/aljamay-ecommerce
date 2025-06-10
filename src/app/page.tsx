"use client";
import Hero from "@/components/Hero";
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks";
import ProductList from "@/components/products/ProductList";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";

export default function Home() {
	const { data, isLoading } = useGetProducts({
		limit: 40,
		offset: 0,
		search: "",
	});

	return (
		<main className="flex min-h-screen flex-col gap-10 items-center">
			<Hero />
			{/* <Suspense
				fallback={
					<div>
						<span>Loading products...</span>
					</div>
				}
			>
				<FeaturedProducts />
			</Suspense> */}
			{/* <Values /> */}
			{/* <Promotion /> */}
			<ProductCategoryHeader />
			<ProductList products={data!} isLoading={isLoading} />
		</main>
	);
}

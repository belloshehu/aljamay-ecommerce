"use client";
import Hero from "@/components/Hero";
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks";
import ProductList from "@/components/products/ProductList";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";
import { Badge } from "@/components/ui/badge";

export default function Home() {
	const { data, isLoading } = useGetProducts({
		limit: 40,
		offset: 0,
		search: "",
	});

	return (
		<main className="flex min-h-screen flex-col gap-5  items-center px-2 md:px-10">
			{data && data.length > 0 && <ProductCategoryHeader />}
			{/* <CategoryNavbar /> */}

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
			<section className="w-full flex flex-col items-start justify-start gap-2 p-0 md:px-20">
				{/* <h2 className="text-xl font-semibold">Popular tea spices</h2> */}
				<ProductList products={data!} isLoading={isLoading} />
			</section>
			<section className="w-full flex flex-col items-start justify-start gap-2 p-0 md:px-20">
				<div className="w-full flex items-center justify-between gap-2 bg-[#ADF802]/35 p-2 rounded-md">
					<h2 className="md:text-xl font-semibold">Popular tea spices</h2>{" "}
					<Badge className="text-[#ADF802]">{data?.length || 0}</Badge>
				</div>
				<ProductList products={data!} isLoading={isLoading} />
			</section>

			<section className="w-full flex flex-col items-start justify-start gap-2 p-0 md:px-20">
				<div className="w-full flex items-center justify-between gap-2 bg-[#ADF802]/35 p-2 rounded-md">
					<h2 className="md:text-xl font-semibold">Popular stew/soup spices</h2>
					<Badge className="text-[#ADF802]">{data?.length || 0}</Badge>
				</div>
				<ProductList products={data!} isLoading={isLoading} />
			</section>
		</main>
	);
}

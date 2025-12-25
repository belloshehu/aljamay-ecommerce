"use client";
import Hero from "@/components/Hero";
import { useGetProducts } from "@/hooks/service-hooks/product.service.hooks";
import ProductList from "@/components/products/ProductList";
import { lazy, Suspense } from "react";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";
const HappyNewYear = lazy(() => import("@/components/animations/HappyNewYear"));

export default function Home() {
	const { data, isLoading } = useGetProducts({
		limit: 40,
		offset: 0,
		search: "",
	});

	return (
		<main className="flex min-h-screen flex-col gap-5  items-center mt-10 px-2 md:px-10">
			<ProductCategoryHeader mode="mobile" />
			<Suspense>
				<HappyNewYear />
			</Suspense>
			<Hero />
			<section className="w-full flex flex-col items-start justify-start gap-2 p-0 md:px-20 rounded-xl">
				{/* <h2 className="text-xl font-semibold">Popular tea spices</h2> */}
				<ProductList products={data!} isLoading={isLoading} />
			</section>
		</main>
	);
}

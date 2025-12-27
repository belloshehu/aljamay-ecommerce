import Hero from "@/components/Hero";
import ProductList from "@/components/products/ProductList";
import { lazy, Suspense } from "react";
import ProductCategoryHeader from "@/components/products/ProductFilterHearder";
import { prisma } from "@/lib/prisma";
import { ProductListSkeleton } from "@/components/products/skeletons/ProductSkeleton";
const HappyNewYear = lazy(() => import("@/components/animations/HappyNewYear"));

export default async function Home() {
	const products = await prisma.product.findMany();

	return (
		<main className="flex min-h-screen flex-col gap-5  items-center mt-10 px-2 md:px-10">
			<ProductCategoryHeader mode="mobile" />
			<Suspense>
				<HappyNewYear />
			</Suspense>

			<Hero />
			<section className="w-full flex flex-col items-start justify-start gap-2 p-0 md:px-20 rounded-xl">
				{/* <h2 className="text-xl font-semibold">Popular tea spices</h2> */}
				<Suspense fallback={<ProductListSkeleton />}>
					<ProductList products={products} />
				</Suspense>
			</section>
		</main>
	);
}

"use client";

import Hero from "@/components/Hero";
import { Values } from "@/components/Values";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center">
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
			<Values />
			{/* <Promotion /> */}
		</main>
	);
}

// import { products } from "../data";
"use client";
import { getProducts } from "@/app/actions/product.action";
import Product from "./products/Product";
import { ProductType } from "@/types/product.types";
import { useEffect, useState } from "react";

const getFeaturedProducts = async () => {
	const products = await getProducts();
	if (!products || products.length === 0) {
		return [];
	}
	return products;
};

export default function FeaturedProducts() {
	const [products, setProducts] = useState<ProductType[] | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const featuredProducts = await getFeaturedProducts();
				setProducts(featuredProducts as ProductType[]);
			} catch (error) {
				console.error("Failed to fetch products:", error);
				setProducts([]);
			}
		};

		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!products || products.length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<h2>No product found</h2>
			</div>
		);
	}
	return (
		<section className="min-h-screen w-full p-5 lg:p-24">
			<h1 className="bg-gradient-to-r text-transparent from-green-800 via-black to-cyan-500 font-extrabold bg-clip-text text-3xl lg:text-7xl my-5 text-center md:text-center">
				Featured products
			</h1>
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<Product product={product} key={product.id} />
				))}
			</div>
		</section>
	);
}

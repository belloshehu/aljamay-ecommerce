"use client";
import { ProductQuantityField } from "./ProductQuantityField";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedProduct } from "../../GlobalRedux/features/product/productSlice";
// import { addToCart } from "../../GlobalRedux/features/cart/cartSlice";
import { getDiscountPercent } from "@/lib/product.utils";
import { ProductType } from "@/types/product.types";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

function ProductDetailSection({
	product = null,
}: {
	product: ProductType | null;
}) {
	if (!product) return <div>No product data</div>;
	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-xl md:text-3xl font-semibold">{product?.name}</h1>
			<p>{product.description}</p>
			<div className="flex items-center justify-start gap-5 p-0">
				<p className="text-xl">N{product?.price}</p>
				<p className="text-xl text-slate-400 line-through">
					N{product?.price + product?.discount}
				</p>
				<h3 className=" bg-cyan-100 p-1 rounded-md text-cyan-500">
					{getDiscountPercent(product.price, product.discount)}% off
				</h3>
			</div>
			<p>{product?.quantity} in stock</p>
			<ProductQuantityField />

			<div className="flex justify-start gap-4 items-center my-5 md:my-10">
				<Button
					size={"lg"}
					className="bg-gradient-to-r from-green-800 to-cyan-500 shadow-lg text-white font-semibold  max-w-fit"
				>
					<ShoppingCart />
					Add to cart
				</Button>
			</div>
		</section>
	);
}

export default ProductDetailSection;

"use client";
import Link from "next/link";
import { ProductQuantityField } from "./ProductQuantityField";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedProduct } from "../../GlobalRedux/features/product/productSlice";
// import { addToCart } from "../../GlobalRedux/features/cart/cartSlice";
import { getPriceWithoutDiscount } from "@/lib/product.utils";
import { ProductType } from "@/types/product.types";

function ProductDetailSection({
	product = null,
}: {
	product: ProductType | null;
}) {
	if (!product) return <div>No product data</div>;
	return (
		<section className="flex flex-col gap-4">
			<h1 className="text-xl md:text-3xl font-semibold">{product?.name}</h1>
			<div className="flex items-center justify-start gap-5 p-0">
				<p className="text-xl">N{product?.price}</p>
				<p className="text-xl text-slate-400 line-through">
					N{getPriceWithoutDiscount(product?.price, product?.discount)}
				</p>
				<h3 className=" bg-cyan-100 p-1 rounded-md text-cyan-500">
					{product?.discount}% off
				</h3>
			</div>
			<p>{product?.stock} in stock</p>
			<ProductQuantityField />
			<div>
				{/* show the total price of the product: (quantiy * price)  */}
				{/* <p>Total cost: N{product?.price * selectedProduct?.quantity}</p> */}
			</div>
			<div className="flex justify-start gap-4 items-center my-5 md:my-10">
				<Link
					href="order"
					className="p-4 bg-gradient-to-r from-green-800 to-cyan-500 shadow-lg text-white font-semibold px-7 max-w-fit"
				>
					Place order
				</Link>
				<button
					className="p-4 bg-gradient-to-r from-green-800 to-cyan-500 shadow-lg text-white font-semibold px-7 max-w-fit"
					onClick={() => {
						// dispatch(addToCart(selectedProduct));
					}}
				>
					Add to cart
				</button>
			</div>
		</section>
	);
}

export default ProductDetailSection;

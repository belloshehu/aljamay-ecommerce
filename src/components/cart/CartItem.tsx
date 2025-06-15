"use client";
import Link from "next/link";
import { getDiscountPercent } from "@/lib/product.utils";

import React from "react";
import { CartItemType as CartItemProps } from "@/types/cart.types";
import Image from "next/image";
import { Button } from "../ui/button";
import { ProductQuantityField } from "../products/ProductQuantityField";
import { useRemoveFromCart } from "@/hooks/service-hooks/cart.service.hooks";
import { Card } from "../ui/card";

const CartItem = ({
	id,
	product: { name, price, discount, quantity: stock, image },
	quantity,
}: CartItemProps) => {
	const { mutate, isPending } = useRemoveFromCart();

	const handleRemoveFromCart = () => {
		mutate({ productId: id });
	};
	return (
		<Card className="w-full border-[1px] border-gray-200 flex gap-y-5 flex-col items-center justify-center md:flex-row md:justify-start md:gap-x-8">
			<Image
				src={image}
				alt={name}
				className="w-full md:w-2/5 aspect-auto"
				height={200}
				width={300}
			/>
			<div className="w-full flex flex-col gap-2 p-5">
				<Link href={`/products/${id}`}>
					<h3 className="text-xl font-semibold">{name}</h3>
				</Link>
				<div className="flex items-center justify-start gap-5 p-0">
					<p className="text-xl">N{price}</p>
					<p className="text-xl text-slate-400 line-through">
						N{price + discount}
					</p>
					<h3 className=" bg-[#ADF802] p-1 rounded-md text-gray-600">
						{getDiscountPercent(price, discount)}% off
					</h3>
				</div>
				<p>{stock} left</p>

				<div className="w-full flex flex-col md:flex-row items-start justify-start gap-3">
					<ProductQuantityField defaultQuantity={quantity} cartItemId={id} />
					<div className="flex  gap-3  md:ml-auto">
						<Link href="/products/checkout">
							<Button className="bg-[#ADF802] shadow-lg text-black font-semibold ">
								Checkout
							</Button>
						</Link>
						<Button
							disabled={isPending}
							onClick={handleRemoveFromCart}
							className="bg-black text-center shadow-lg text-[#ADF802] font-semibold"
						>
							Remove
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CartItem;

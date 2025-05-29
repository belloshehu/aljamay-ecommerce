"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
const CartNavItem = () => {
	return (
		<Link
			className="relative flex items-center justify-center gap-2"
			href={"/dashboard/carts"}
		>
			<span className="flex items-center justify-center absolute -top-2 bg-opacity-75 -left-5 bg-black/70 text-white rounded-full w-8 h-8 text-center">
				<small>0</small>
			</span>
			<ShoppingCart className="text-3xl text-green-300" />
		</Link>
	);
};

export default CartNavItem;

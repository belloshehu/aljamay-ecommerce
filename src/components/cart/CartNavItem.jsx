"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
const CartNavItem = () => {
	return (
		<Link
			className="relative flex items-center justify-center gap-2"
			href={"/cart"}
		>
			<span className="flex items-center justify-center absolute -top-2 bg-opacity-75 -left-5 bg-black text-primary rounded-full w-8 h-8 text-center">
				<small>0</small>
			</span>
			<ShoppingBag className="text-3xl text-green-300" />
		</Link>
	);
};

export default CartNavItem;

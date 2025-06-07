"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks";
import Loader from "../Loader";

export default function CheckoutSidebar({ className }: { className?: string }) {
	const { data, isPending } = useGetCartItems();

	// Calculate total price using useMemo
	const calculateTotalPrice = () => {
		if (!data || data.length === 0) return 0;
		return data.reduce((total, item) => {
			const itemPrice = item.product.price - item.product.discount;
			return total + itemPrice * item.quantity;
		}, 0);
	};

	const totalPrice = useMemo(calculateTotalPrice, [data]);

	if (isPending) {
		return <Loader message="loading cart items " />;
	}

	return (
		<aside
			className={cn(
				"w-full p-4 flex flex-col gap-5 items-start justify-start bg-white border-slate-200 rounded-lg border-[1px] my-10 md:m-0 md:h-[80vh]",
				className
			)}
		>
			<h3 className="text-xl font-semibold flex items-center gap-2">
				<ShoppingCart className="text-cyan-300" />
				{data?.length || 0} items
			</h3>

			<h1 className="font-bold text-2xl md:text-3xl">
				<span className="line-through"> N</span>
				{totalPrice}
			</h1>

			<Link href="/products/checkout" className="w-full">
				<Button
					className="bg-gradient-to-br from-green-800 to-cyan-500 w-full"
					size={"lg"}
				>
					Checkout
				</Button>
			</Link>
		</aside>
	);
}

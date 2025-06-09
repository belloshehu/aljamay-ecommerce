"use client";

import { Button } from "../ui/button";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks";
import Loader from "../Loader";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";

export default function OrderSummarySidebar({
	className,
}: {
	className?: string;
}) {
	const { data, isPending } = useGetCartItems();

	// Calculate total price using useMemo
	const calculateTotalPrice = () => {
		if (!data || data.length === 0) return 0;
		return data.reduce((total, item) => {
			const itemPrice = item.product.price - item.product.discount;
			return total + itemPrice * item.quantity;
		}, 0);
	};

	// calculate total dicount
	const calculateTotalDiscount = () => {
		if (!data || data.length === 0) return 0;
		return data.reduce((total, item) => {
			return total + item.product.discount * item.quantity;
		}, 0);
	};

	const totalPrice = useMemo(calculateTotalPrice, [data]);
	const totalDiscount = useMemo(calculateTotalDiscount, [data]);

	if (isPending) {
		return <Loader message="loading cart items " />;
	}

	return (
		<aside
			className={cn(
				"w-full p-4 flex flex-col gap-5 items-start col-span-2 justify-start bg-white border-slate-200 rounded-lg border-[1px] my-10 md:m-0 md:h-[80vh]",
				className
			)}
		>
			<h3 className="text-xl font-semibold flex items-center gap-2">
				Order Details
			</h3>
			<Separator className="w-full" />

			<div className="w-full flex items-center justify-between gap-2">
				<Input placeholder="Enter coupon code" />
				<Button className="bg-gradient-to-b from-cyan-600 to-green-700">
					Apply
				</Button>
			</div>
			<div className="w-full flex items-center justify-between gap-2">
				<p>Total item (s) cost:</p>
				<h1 className="font-medium text-xl line-through">
					<span className="line-through"> N</span>
					{totalPrice}
				</h1>
			</div>
			<div className="w-full flex items-center justify-between gap-2">
				<p>Total discount:</p>
				<h1 className="font-medium text-xl">
					<span className="line-through"> N</span>
					{totalDiscount}
				</h1>
			</div>
			<Separator className="w-full" />
			<div className="w-full flex justify-between items-center gap-2">
				<p>Shipping:</p>
				<h1 className="font-medium text-xl">
					<span className="line-through"> N</span>
					{0}
				</h1>
			</div>

			<Separator className="w-full" />
			<div className="w-full flex justify-between items-center gap-2">
				<p>Total cost:</p>
				<h1 className="font-semibold text-xl">
					<span className="line-through"> N</span>
					{totalPrice - totalDiscount}
				</h1>
			</div>

			<Button
				className="bg-gradient-to-br from-green-800 to-cyan-500 w-full"
				size={"lg"}
			>
				Submit Order
			</Button>
		</aside>
	);
}

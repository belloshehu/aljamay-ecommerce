import { CartItemType } from "@/types/cart.types";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CheckoutSidebar({
	cartItems = [],
	className,
}: {
	cartItems?: CartItemType[];
	className?: string;
}) {
	// Calculate total price using useMemo
	const calculateTotalPrice = () => {
		return cartItems.reduce((total, item) => {
			const itemPrice = item.product.price - item.product.discount;
			return total + itemPrice * item.quantity;
		}, 0);
	};

	const totalPrice = useMemo(calculateTotalPrice, [cartItems]);

	return (
		<aside
			className={cn(
				"w-full p-4 flex flex-col gap-5 items-start justify-start bg-white border-slate-200 rounded-lg border-[1px] my-10 md:m-0 md:h-[80vh]",
				className
			)}
		>
			<h3 className="text-xl font-semibold flex items-center gap-2">
				<ShoppingCart className="text-cyan-300" />
				{cartItems.length} items
			</h3>

			<h1 className="font-bold text-2xl md:text-3xl">
				<span className="line-through"> N</span>
				{totalPrice}
			</h1>

			<Link href="/products/cart">
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

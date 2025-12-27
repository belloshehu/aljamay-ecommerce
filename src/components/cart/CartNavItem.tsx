"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks";
const CartNavItem = ({
	className,
	iconClassName,
}: {
	className?: string;
	iconClassName?: string;
}) => {
	const { data } = useGetCartItems();
	return (
		<Link
			className="relative flex items-center justify-center gap-2"
			href={"/products/cart"}
		>
			<ShoppingCart
				className={cn("text-3xl text-[#ADF802]", iconClassName)}
				color="#ADF802"
				size={30}
			/>
			<small className="text-black bg-[#ADF802]  px-2 rounded-full absolute -right-3 bottom-2">
				{data?.length || 0}
			</small>
		</Link>
	);
};

export default CartNavItem;

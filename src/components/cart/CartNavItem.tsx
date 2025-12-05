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
			<span
				className={cn(
					"flex items-center justify-center absolute -top-2 bg-opacity-75 -right-3 bg-[#ADF802] text-white rounded-full w-6 h-6 text-center",
					className
				)}
			>
				<small>{data?.length || 0}</small>
			</span>
			<ShoppingCart className={cn("text-3xl text-[#ADF802]", iconClassName)} />
		</Link>
	);
};

export default CartNavItem;

import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { OrderItemType, OrderStatus } from "@/types/order.types";
import { formatDate } from "@/lib/timedate";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ShippingAddressType } from "@/types/shipping.types";

interface OrderItemProps extends OrderItemType {
	className?: string;
	status?: OrderStatus;
	shippingAddress?: ShippingAddressType;
}
export default function OrderItem({
	className,
	createdAt,
	price,
	product,
	quantity,
	status,
	orderNumber,
}: OrderItemProps) {
	return (
		<Card className={cn("w-full p-5 flex flex-col gap-3", className)}>
			<header className="flex items-center justify-between w-full">
				<h3 className="font-medium">{formatDate(createdAt?.toString()!)}</h3>
				<h3 className="font-medium text-cyan-500">{status}</h3>
			</header>
			<Separator className="w-full" />
			<div>
				<p className="text-sm text-slate-500">Order Number: {orderNumber}</p>
				<p className="text-sm text-slate-500">Quantity: {quantity}</p>
				<p className="text-sm text-slate-500">Total: {price * quantity}</p>
			</div>
			<h3 className="text-xl font-medium">{product.name}</h3>
			<p className="text-sm text-slate-500">{product.description}</p>
			<Image
				src={product.image}
				alt={product.name}
				width={100}
				height={50}
				className="object-contain rounded-md"
				loading="lazy"
			/>
		</Card>
	);
}

import { formatDate } from "@/lib/timedate";
import { cn } from "@/lib/utils";

export default function OrderListHeader({
	createdAt,
	status,
	OrderItemsCount,
	className,
	totalAmount,
}: {
	createdAt: string;
	status: string;
	className?: string;
	OrderItemsCount?: number;
	totalAmount?: number;
}) {
	return (
		<header
			className={cn(
				"w-full md:w-1/2 flex items-center justify-between p-2 bg-gray-100 rounded-md shadow-sm",
				className
			)}
		>
			<h2>{formatDate(createdAt)}</h2>
			<h2>
				{OrderItemsCount} item(s) | <span className="line-through">N</span>{" "}
				{totalAmount}
			</h2>
			<h3 className="text-lg font-semibold text-[#ADF802]">{status}</h3>
		</header>
	);
}

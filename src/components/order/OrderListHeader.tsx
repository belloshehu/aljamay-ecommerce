import { formatDate } from "@/lib/timedate";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user.types";
import Avatar from "../users/Avatar";

export default function OrderListHeader({
	createdAt,
	status,
	OrderItemsCount,
	className,
	totalAmount,
	user,
}: {
	createdAt: string;
	status: string;
	className?: string;
	OrderItemsCount?: number;
	totalAmount?: number;
	user: UserType;
}) {
	return (
		<header
			className={cn(
				"w-full flex items-center justify-between p-2 bg-gray-50 rounded-md shadow-sm",
				className
			)}
		>
			<h2>{formatDate(createdAt)}</h2>
			<h2>
				{OrderItemsCount} item(s) | <span className="line-through">N</span>{" "}
				{totalAmount}
			</h2>
			<h3 className="text-lg font-semibold text-[#ADF802]">{status}</h3>
			<Avatar imageUrl={user?.image!} />
		</header>
	);
}

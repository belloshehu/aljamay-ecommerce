import { ShippingAddressType } from "@/types/shipping.types";
import { Edit, PhoneCall } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ShippingAddressProps extends ShippingAddressType {
	className?: string;
	handleEdit?: () => void;
}

export default function ShippingAddress({
	firstName,
	lastName,
	phoneNumber,
	streetAddress,
	city,
	state,
	country,
	isDefault,
	isActive,
	className,
	handleEdit,
}: ShippingAddressProps) {
	return (
		<Card
			className={cn(
				"w-full flex flex-col gap-1 p-5 bg-white rounded-md border-[1px]",
				className
			)}
		>
			<header className="flex flex-row items-center justify-between gap-1">
				<h2 className="text-cyan-600 text-xl font-semibold">
					{firstName} {lastName}
				</h2>
				<small className="text-gray-500 flex items-center gap-1">
					<PhoneCall size={16} />
					{phoneNumber}
				</small>
			</header>
			<p className="text-gray-500">{streetAddress}</p>
			<p>
				{city}, {state}, {country}
			</p>
			<div className="flex items-center gap-2 mt-2">
				{isDefault && <Badge title={isDefault && "Default"}>Default</Badge>}
				{isActive && (
					<Badge title={isActive && "Active"} variant={"outline"}>
						Active
					</Badge>
				)}
				<Button
					variant={"ghost"}
					className="ml-auto"
					onClick={() => {
						handleEdit && handleEdit();
					}}
				>
					<Edit size={16} />
				</Button>
			</div>
		</Card>
	);
}

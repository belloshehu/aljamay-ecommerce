"use client";

import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
import usePayment from "@/hooks/use-payment";
import { makeFlutterwareConfig } from "@/config/flutterwave.config";
import { Session } from "next-auth";
import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks";
import { useCreateOrder } from "@/hooks/service-hooks/order.service.hooks";
import { toast } from "sonner";
import { FlutterWaveResponse } from "flutterwave-react-v3/dist/types";
import { useRouter } from "next/navigation";

export default function OrderSummarySidebar({
	className,
	session,
}: {
	className?: string;
	session: Session;
}) {
	const { data, isPending } = useGetCartItems();
	const { mutateAsync, isPending: isCreatingOrder } = useCreateOrder();
	const { useCustomFlutterwave } = usePayment();
	const { isPending: isPendingShipping, data: shippingAddress } =
		useGetAllShippingAdressesByUser();
	const router = useRouter();

	const defaultAddress = shippingAddress?.find((address) => address.isDefault);

	// Calculate total price using useMemo
	const calculateTotalPrice = () => {
		if (!data || data.length === 0) return 0;
		return data.reduce((total, item) => {
			const itemPrice = item.product.price;
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
	const { closePaymentModal, handleFlutterPayment } = useCustomFlutterwave(
		makeFlutterwareConfig({
			amount: totalPrice,
			currency: "NGN",
			customer: {
				email: session.user?.email!,
				name: `${session?.user.firstName} ${session?.user.lastName}`,
				phone_number: defaultAddress?.phoneNumber!,
			},
			customizations: {
				title: "Order payment",
				description: "Payment for order",
			},
		})
	);

	const handleCheckout = async () => {
		handleFlutterPayment({
			callback: (response: FlutterWaveResponse) => {
				if (response.status === "successful") {
					// Handle successful payment
					toast.success("Payment successful!");
					mutateAsync({
						cartItems: data?.map((item) => item.id)!,
						shippingAddressId: defaultAddress?.id!,
						paymentMethod: "flutterwave",
						totalAmount: totalPrice - totalDiscount + 0, // Assuming shipping cost is 0
					})
						.then(() => {
							toast.success("Order created successfully!");
							router.push("/dashboard/orders");
						})
						.catch((error) => {
							console.log("Error creating order:", error);
							toast.error("Error creating order: " + error.message);
						});
				} else {
					// Handle failed payment
					toast.error("Payment failed. Please try again.");
				}
				closePaymentModal();
			},
			onClose: closePaymentModal,
		});
	};

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
					{totalPrice}
				</h1>
			</div>

			<Button
				className="bg-gradient-to-br from-green-800 to-cyan-500 w-full"
				size={"lg"}
				onClick={handleCheckout}
				disabled={
					isPendingShipping || isPending || !data?.length || !defaultAddress
				}
			>
				Submit Order
			</Button>
		</aside>
	);
}

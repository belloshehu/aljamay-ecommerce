"use client";

import { usePathname } from "next/navigation";
import CheckoutSidebar from "./CheckoutSidebar";
import OrderSummarySidebar from "../order/OrderSummarySidebar";
import { Session } from "next-auth";

export default function ProductPageSidebar({ session }: { session: Session }) {
	const isCheckoutPage = usePathname() === "/products/checkout";

	if (isCheckoutPage) return <OrderSummarySidebar session={session} />;
	return <CheckoutSidebar />;
}

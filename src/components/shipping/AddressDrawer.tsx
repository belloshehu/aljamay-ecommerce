"use  client";
import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import ShippingAddressForm from "./ShippingAddressForm";
import { ShipWheel, Container } from "lucide-react";
import { ShippingAddressType } from "@/types/shipping.types";
import { ScrollArea } from "../ui/scroll-area";

interface AddressDrawerProps {
	addressData?: ShippingAddressType | null;
	drawerOpen: boolean;
	handleToggleDrawer: () => void;
}
export default function AddressDrawer({
	drawerOpen,
	addressData,
	handleToggleDrawer,
}: AddressDrawerProps) {
	return (
		<Drawer
			direction="right"
			open={drawerOpen}
			onOpenChange={handleToggleDrawer}
		>
			<DrawerDescription hidden>
				Manage your shipping address by adding, editing, or deleting addresses.
				You can also set a default address for quick access during checkout.
			</DrawerDescription>
			<DrawerTrigger asChild>
				<Button variant="outline" className="text-cyan-500">
					<Container /> Add Shipping Address
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full md:w-[500px]">
				<DrawerHeader>
					<DrawerTitle className="flex items-center gap-2">
						<ShipWheel className="text-cyan-500" />
						Shipping Address
					</DrawerTitle>
				</DrawerHeader>
				<ScrollArea className="h-[96vh] p-5">
					<ShippingAddressForm
						postSubmitHandler={handleToggleDrawer}
						defaultValues={addressData}
					/>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	);
}

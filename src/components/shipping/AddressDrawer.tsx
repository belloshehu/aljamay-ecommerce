import { Button } from "../ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../ui/drawer";
import ShippingAddressForm from "./ShippingAddressForm";
import { ShipWheel, Container } from "lucide-react";

export default function AddressDrawer() {
	return (
		<Drawer direction="right">
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
				<ShippingAddressForm />
			</DrawerContent>
		</Drawer>
	);
}

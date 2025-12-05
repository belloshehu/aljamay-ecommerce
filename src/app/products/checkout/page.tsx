"use client";
import CartItem from "@/components/cart/CartItem";
import Loader from "@/components/Loader";
import AddressDrawer from "@/components/shipping/AddressDrawer";
import ShippingAddress from "@/components/shipping/ShippingAddress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetCartItems } from "@/hooks/service-hooks/cart.service.hooks";
import { useGetAllShippingAdressesByUser } from "@/hooks/service-hooks/shipping.service.hooks";
import { ShippingAddressType } from "@/types/shipping.types";
import { useState } from "react";

export default function CheckoutPage() {
	const { data, isLoading } = useGetCartItems();
	const { data: addresses, isLoading: loadingAddresses } =
		useGetAllShippingAdressesByUser();
	const [toggleAdressForm, setToggleAddressForm] = useState(false);
	const [selectedAddress, setSelectedAddress] =
		useState<ShippingAddressType | null>(null);

	const handleToggleAddressForm = () => {
		setToggleAddressForm((prev) => !prev);
		if (toggleAdressForm) {
			setSelectedAddress(null); // Reset selected address when closing the form
		}
	};

	const handleEditAddress = (address: ShippingAddressType) => {
		if (address) {
			setSelectedAddress(address);
			handleToggleAddressForm();
		}
	};

	if (isLoading) {
		return (
			<div className="w-full h-[80vh] flex items-center justify-center">
				<Loader />
			</div>
		);
	}
	if (!data || data.length === 0) {
		return (
			<div className="w-full flex items-center justify-center h-full">
				Product not found
			</div>
		);
	}

	return (
		<section className="w-full flex-col items-start justify-start gap-5 p-5 md:px-20">
			<div className="flex justify-start items-start">
				<h1 className="text-xl font-semibold ">Checkout</h1>
			</div>
			<div className="w-full flex flex-col gap-5  border-[1px] rounded-md p-5 bg-white">
				<div className="w-full flex justify-between items-center">
					<h3>Shipping address</h3>
					{/* <Button onClick={handleToggleAddressForm}>
						{toggleAdressForm ? <SidebarClose /> : <Menu />} Add shipping
						Address
					</Button> */}
					<AddressDrawer
						drawerOpen={toggleAdressForm}
						handleToggleDrawer={handleToggleAddressForm}
						addressData={selectedAddress}
					/>
				</div>
				<ScrollArea className="w-full md:max-h-[300px]">
					{loadingAddresses ? (
						<Loader />
					) : (
						addresses?.map((address) => (
							<ShippingAddress
								{...address}
								key={address.id}
								handleEdit={() => handleEditAddress(address)}
							/>
						))
					)}
				</ScrollArea>
			</div>

			<section className="w-full gap-5 flex flex-col my-10">
				<div className="flex justify-start items-start">
					<h1 className="text-xl font-semibold ">Order Items</h1>
				</div>
				<ScrollArea className="w-full md:max-h-[500px]">
					{data.map((item) => (
						<CartItem {...item} key={item.id} />
					))}
				</ScrollArea>
			</section>

			<section className="w-full gap-5 flex flex-col my-10">
				<div className="flex justify-start items-start">
					<h1 className="text-xl font-semibold ">Payment methods</h1>
				</div>
				<ScrollArea className="w-full md:max-h-[500px]"></ScrollArea>
			</section>
		</section>
	);
}

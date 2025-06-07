"use client";
import React from "react";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useUpdateCartItemQuantity } from "@/hooks/service-hooks/cart.service.hooks";

export const ProductQuantityField = ({
	defaultQuantity = 1,
	quantityChangeHandler,
	cartItemId,
}: {
	defaultQuantity?: number;
	quantityChangeHandler?: (quantity: number) => void;
	cartItemId?: string;
}) => {
	const { mutate, isPending } = useUpdateCartItemQuantity();
	return (
		<div className="max-w-fit text-black">
			<Select
				defaultValue={`${defaultQuantity}`}
				disabled={isPending}
				onValueChange={(value) => {
					console.log("Selected value:", value);
					if (quantityChangeHandler && value) {
						// Convert the value to a number and call the handler
						quantityChangeHandler(Number(value));
					}
					if (cartItemId && value) {
						// If cartItemId is provided, update the quantity in the cart
						console.log(
							"Updating cart item:",
							cartItemId,
							"to quantity:",
							value
						);
						mutate({
							cartItemId,
							quantity: Number(value),
						});
					}
				}}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select quantity" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Choose quantity</SelectLabel>
						{Array.from({ length: 100 }, (val, index) => index).map(
							(item, index) => (
								<SelectItem value={`${index + 1}`} key={index}>
									Quantity {index + 1}
								</SelectItem>
							)
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

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

export const ProductQuantityField = ({
	defaultQuantity = 1,
}: {
	defaultQuantity?: number;
}) => {
	// const { selectedProduct } = useSelector((store) => store.product);
	// const dispatch = useDispatch();

	// const handleIncrease = () => {
	// 	dispatch(increaseQuantity());
	// };

	// const handleDecrease = () => {
	// 	dispatch(decreaseQuantity());
	// };

	return (
		<div className="max-w-fit text-black">
			<Select defaultValue={`${defaultQuantity}`}>
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

"use client";
import React from "react";

export const ProductQuantityField = () => {
	// const { selectedProduct } = useSelector((store) => store.product);
	// const dispatch = useDispatch();

	// const handleIncrease = () => {
	// 	dispatch(increaseQuantity());
	// };

	// const handleDecrease = () => {
	// 	dispatch(decreaseQuantity());
	// };

	return (
		<div>
			<p>Quantity</p>
			<div className="flex justify-start items-center gap-2 my-2">
				<button
					className="p-2 rounded-md bg-cyan-300 text-white font-normal"
					// onClick={handleDecrease}
				>
					{/* <HiOutlineMinusSmall /> */}
				</button>
				<p className="p-2 px-4 rounded-md border-[1px] border-cyan-400">
					{/* {selectedProduct?.quantity} */}
				</p>
				<button
					className="p-2 rounded-md bg-cyan-300 text-white font-light"
					// onClick={handleIncrease}
				>
					{/* <GoPlus /> */}
				</button>
			</div>
			{/* <input
        defaultValue={1}
        min={1}
        type="number"
        className="rounded-md w-full md:w-1/2 p-3 outline-none border-[1px] border-cyan-500"
        onChange={changeHandler}
      /> */}
		</div>
	);
};

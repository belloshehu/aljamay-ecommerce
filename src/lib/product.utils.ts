export const getPriceWithoutDiscount = (price: number, discount: number) => {
	return price + (price * discount) / 100;
};

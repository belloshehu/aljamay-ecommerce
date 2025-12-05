export const getPriceWithoutDiscount = (price: number, discount: number) => {
	return price + (price * discount) / 100;
};

export const getDiscountPercent = (price: number, discount: number) => {
	return Math.round((discount / price) * 100);
};

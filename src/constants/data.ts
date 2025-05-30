import { SelectDataType } from "@/types/data.types";

export const carousel = [
	{
		message: "Your freshly baked bread makes my family happy day and night.",
		image: "/images/bread1.jpg",
	},

	{
		message: "Your freshly baked bread makes my family happy day and night.",
		image: "/images/bread1.jpg",
	},
];

export const products = [
	{
		id: "1212312",
		name: "Cake",
		status: "available",
		price: 1200,
		image: "/images/conf3.jpg",
		discount: 10,
		stock: 100,
	},

	{
		id: "1264432",
		name: "Bread",
		status: "available",
		price: 1200,
		image: "/images/bread1.jpg",
		discount: 12,
		stock: 13,
	},
	{
		id: "1234312",
		name: "Cake bread",
		status: "not available",
		price: 1200,
		image: "/images/bread4.jpg",
		discount: 5,
		stock: 10,
	},
	{
		id: "1200312",
		name: "Cake bread",
		status: "available",
		price: 1200,
		image: "/images/bread3.jpg",
		discount: 15,
		stock: 106,
	},
];

export const productCategories: SelectDataType[] = [
	{
		label: "All Products",
		value: "all",
	},
	{
		label: "Cakes",
		value: "cakes",
	},
	{
		label: "Breads",
		value: "breads",
	},
	{
		label: "Pastries",
		value: "pastries",
	},
	{
		label: "Spicies",
		value: "spicies",
	},
	// , {
	// 	label: "Cookies",
	// 	value: "cookies",
	// }, {
	// 	label: "Pies",
	// 	value: "pies",
	// }, {
	// 	label: "Cupcakes",
	// 	value: "cupcakes",
	// }, {
	// 	label: "Donuts",
	// 	value: "donuts",
	// 	}
];

export const productSortOptions: SelectDataType[] = [
	{
		label: "None",
		value: "none",
	},
	{
		label: "Price: Low to High",
		value: "price-low-high",
	},
	{
		label: "Price: High to Low",
		value: "price-high-low",
	},
	{
		label: "Newest",
		value: "newest",
	},
	{
		label: "Oldest",
		value: "oldest",
	},
];

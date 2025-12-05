import { SelectDataType } from "@/types/data.types";
import { IconType } from "../../public";

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

export const statesInNigeria: SelectDataType[] = [
	{ label: "Abia", value: "Abia" },
	{ label: "Adamawa", value: "Adamawa" },
	{ label: "Akwa Ibom", value: "Akwa Ibom" },
	{ label: "Anambra", value: "Anambra" },
	{ label: "Bauchi", value: "Bauchi" },
	{ label: "Bayelsa", value: "Bayelsa" },
	{ label: "Benue", value: "Benue" },
	{ label: "Borno", value: "Borno" },
	{ label: "Cross River", value: "Cross River" },
	{ label: "Delta", value: "Delta" },
	{ label: "Ebonyi", value: "Ebonyi" },
	{ label: "Edo", value: "Edo" },
	{ label: "Ekiti", value: "Ekiti" },
	{ label: "Enugu", value: "Enugu" },
	{ label: "Gombe", value: "Gombe" },
	{ label: "Imo", value: "Imo" },
	{ label: "Jigawa", value: "Jigawa" },
	{ label: "Kaduna", value: "Kaduna" },
	{ label: "Kano", value: "Kano" },
	{ label: "Katsina", value: "Katsina" },
	{ label: "Kebbi", value: "Kebbi" },
	{ label: "Kogi", value: "Kogi" },
	{ label: "Kwara", value: "Kwara" },
	{ label: "Lagos", value: "Lagos" },
	{ label: "Nasarawa", value: "Nasarawa" },
	{ label: "Niger", value: "Niger" },
	{ label: "Ogun", value: "Ogun" },
	{ label: "Ondo", value: "Ondo" },
	{ label: "Osun", value: "Osun" },
	{ label: "Oyo", value: "Oyo" },
	{ label: "Plateau", value: "Plateau" },
	{ label: "Rivers", value: "Rivers" },
	{ label: "Sokoto", value: "Sokoto" },
	{ label: "Taraba", value: "Taraba" },
	{ label: "Yobe", value: "Yobe" },
	{ label: "Zamfara", value: "Zamfara" },
	{ label: "Abuja", value: "Abuja" },
];

export const productCategoriesWithImages: {
	name: string;
	icon: IconType;
}[] = [
	{
		name: "All",
		icon: "all-categories",
	},
	{
		name: "Bread",
		icon: "bread",
	},
	{
		name: "Spices",
		icon: "spice",
	},

	{
		name: "Tea",
		icon: "tea",
	},
];

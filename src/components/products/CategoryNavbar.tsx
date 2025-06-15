"use client";
import { productCategoriesWithImages } from "@/constants/data";
import ProductCategoryItem from "./ProductCategoryItem";
import { useState } from "react";

export default function CategoryNavbar() {
	const [activeCategory, setActiveCategory] = useState<string | null>("All");

	const handleCategoryClick = (categoryName: string) => {
		setActiveCategory((prev) => (prev === categoryName ? null : categoryName));
	};

	return (
		<div className="flex items-center justify-center  gap-3 w-full md:w-fit">
			{productCategoriesWithImages.map((category) => (
				<ProductCategoryItem
					{...category}
					key={category.name}
					isActive={activeCategory === category.name}
					clickHandler={() => handleCategoryClick(category.name)}
				/>
			))}
		</div>
	);
}

import Spice from "./icons/spices.svg";
import Bread from "./icons/bread.svg";
import Tea from "./icons/tea.svg";
import Logo from "./icons/logo.svg";
import AllCategories from "./icons/all.svg";

import { ElementType, HTMLAttributes } from "react";

export type IconType = "spice" | "bread" | "tea" | "logo" | "all-categories";

export function getIcon(
	type: IconType,
	className?: HTMLAttributes<HTMLOrSVGElement>["className"]
) {
	const iconMap: Record<IconType, ElementType> = {
		spice: Spice,
		bread: Bread,
		tea: Tea,
		logo: Logo,
		"all-categories": AllCategories,
	};

	const IconComponent = iconMap[type];
	return <IconComponent className={className} />;
}

export default getIcon;

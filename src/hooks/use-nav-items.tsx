import { adminNavItems, userNavItems } from "@/constants/navigation";
import { NavigationItemType } from "@/types/navigation.types";
import { ReactNode } from "react";

export default function useCreateNavbar(
	userRole: string,
	makeNavList: (navItems: NavigationItemType[]) => ReactNode
) {
	// render the navigation items based on the user role

	if (userRole === "admin") {
		return makeNavList(adminNavItems);
	} else if (userRole === "user") {
		return makeNavList(userNavItems);
	} else {
		return null;
	}
}

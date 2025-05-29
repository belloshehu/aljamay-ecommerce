import {
	adminDashboardNavigation,
	userDashboardNavigation,
} from "@/constants/navigation";
import { NavigationItemType } from "@/types/navigation.types";
import { UserRole } from "@/types/user.types";
import { ReactNode } from "react";

export default function useCreateNavbar(
	userRole: UserRole,
	makeNavList: (navItems: NavigationItemType[]) => ReactNode
) {
	// render the navigation items based on the user role

	if (userRole === "ADMIN") {
		return makeNavList(adminDashboardNavigation);
	} else if (userRole === "USER") {
		return makeNavList(userDashboardNavigation);
	} else {
		return null;
	}
}

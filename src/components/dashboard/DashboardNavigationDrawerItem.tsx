"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "@/components/NavButton";
import { useEffect } from "react";
import { UserRole, UserType } from "@/types/user.types";
import {
	adminDashboardNavigation,
	userDashboardNavigation,
} from "@/constants/navigation";
import { NavigationItemType } from "@/types/navigation.types";
import { Session } from "next-auth";

// Function to render navigation items based on user role
const renderNavItems = (
	userRole: UserRole,
	currentPathname: string,
	toggleDrawer: (state: boolean) => void
) => {
	// render the navigation items based on the user role
	const makeNavList = (navItems: NavigationItemType[]) => {
		return navItems.map((item, index) => {
			return (
				<NavButton
					className="w-full text-left flex justify-start items-center"
					key={index}
					pathname={item.path}
					currentPathname={currentPathname}
					onClick={() => toggleDrawer(false)}
				>
					<Link className="text-left capitalize" href={item.path}>
						{item.label}
					</Link>
				</NavButton>
			);
		});
	};

	if (userRole === "ADMIN") {
		return makeNavList(adminDashboardNavigation);
	} else if (userRole === "USER") {
		return makeNavList(userDashboardNavigation);
	} else {
		return null;
	}
};

/*
 Component to render navigation drawer for the dashboard navigation items.
 It uses the user's role to determine which navigation items to display.
 It also handles the toggle state of the drawer.
 It returns null if the current pathname is for login or signup pages.
 It is only rendered on mobile screens.
*/
export default function DashboardNavigationDrawerItems({
	toggleDrawer,
	session,
}: {
	toggleDrawer: (val: boolean) => void;
	session: Session;
}) {
	const { role } = session.user as UserType;

	useEffect(() => {}, [role]);

	const pathname = usePathname();
	if (pathname === "/login" || pathname === "/signup") return null;

	return <div>{renderNavItems(role, pathname, toggleDrawer)}</div>;
}

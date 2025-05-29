"use client";
import {
	userDashboardNavigation,
	adminDashboardNavigation,
} from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { NavigationItemType } from "@/types/navigation.types";
import { UserType } from "@/types/user.types";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const renderNavItems = (navItems: NavigationItemType[], pathname: string) => {
	return navItems.map((navItem) => {
		return (
			<Link
				className={cn(
					"p-2 px-4 bg-gradient-to-t from from-green-800 to-cyan-500 text-white",
					{ "bg-slate-200 text-black": navItem.path !== pathname }
				)}
				key={navItem.path}
				href={navItem.path}
			>
				{navItem.label}
			</Link>
		);
	});
};

export default function DashboardNavigation({ session }: { session: Session }) {
	const pathname = usePathname();
	const { role } = session.user as UserType;
	return (
		<nav className="min-h-screen  p-4 col-span-1 hidden md:flex flex-col gap-2 border-r-[1px] ">
			{role === "ADMIN"
				? renderNavItems(adminDashboardNavigation, pathname)
				: renderNavItems(userDashboardNavigation, pathname)}
		</nav>
	);
}

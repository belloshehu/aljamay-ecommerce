import { NavigationItemType } from "@/types/navigation.types";

export const mainNavigationItems = [
	{
		path: "/distributors",
		label: "Distributors",
		isActive: false,
	},
	{
		path: "/products",
		label: "Products",
		isActive: false,
	},
];
export const adminNavItems: NavigationItemType[] = [
	{
		label: "Products",
		path: "/products",
		active: false,
	},
	{
		label: "Users",
		path: "/users",
		active: false,
	},
	{
		label: "Orders",
		path: "/orders",
		active: true,
	},
	{
		label: "Settings",
		path: "/studio/settings",
		active: false,
	},
	{
		label: "Messages",
		path: "/studio/messages",
		active: false,
	},
	{
		label: "Notifications",
		path: "/studio/notifications",
	},
];

export const userNavItems: NavigationItemType[] = [
	{
		label: "Carts",
		path: "/carts",
		active: true,
	},
	{
		label: "Orders",
		path: "/orders",
		active: true,
	},
	{
		label: "Settings",
		path: "/studio/settings",
		active: false,
	},
	{
		label: "Messages",
		path: "/studio/messages",
		active: false,
	},
	{
		label: "Notifications",
		path: "/studio/notifications",
		active: true,
	},
];

export const userDashboardNavigation: NavigationItemType[] = [
	{
		label: "Summary",
		path: "/dashboard",
	},
	{
		label: "orders",
		path: "/dashboard/orders",
	},
	{
		label: "carts",
		path: "/dashboard/carts",
	},
	{
		label: "settings",
		path: "/dashboard/settings",
	},
	{
		label: "profile",
		path: "/dashboard/profile",
	},
];

export const adminDashboardNavigation: NavigationItemType[] = [
	{
		label: "Summary",
		path: "/dashboard",
	},
	{
		label: "users",
		path: "/dashboard/users",
	},
	{
		label: "products",
		path: "/dashboard/products",
	},
	{
		label: "orders",
		path: "/dashboard/orders",
	},
	{
		label: "settings",
		path: "/dashboard/settings",
	},
	{
		label: "profile",
		path: "/dashboard/profile",
	},
];

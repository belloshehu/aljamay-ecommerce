"use client";

import Link from "next/link";
import { mainNavigationItems } from "@/constants/navigation";
import { cn, isActivePath } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const pathname = usePathname();

	return (
		<nav className="items-center gap-5 hidden md:flex ">
			{mainNavigationItems.map(({ label, path }) => (
				<Link
					key={path}
					className={cn("hover:bg-white p-2 rounded-md", {
						"bg-blue-100 rounded-sm py-2 px-5": isActivePath(path, pathname),
					})}
					href={path}
				>
					{label}
				</Link>
			))}
		</nav>
	);
}

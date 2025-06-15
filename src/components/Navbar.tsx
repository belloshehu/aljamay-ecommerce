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
					className={cn("hover:text-gray-600 text-black p-2 rounded-md", {
						"bg-[#ADF802] border-[1px] border-white shadow-sm text-black rounded-sm py-2 px-5":
							isActivePath(path, pathname),
					})}
					href={path}
				>
					{label}
				</Link>
			))}
		</nav>
	);
}

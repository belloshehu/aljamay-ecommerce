"use client";
import { dashboardNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardNavigation({ session }: { session: Session }) {
	const pathname = usePathname();

	return (
		<nav className="min-h-screen  p-4 col-span-1 flex flex-col gap-2 border-r-[1px]">
			{dashboardNavigation.map((navItem) => {
				// hide the "Users" link for regular users
				if (
					navItem.label.toLocaleLowerCase() === "users" &&
					session?.user?.role === "USER"
				) {
					return null;
				}

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
			})}
		</nav>
	);
}

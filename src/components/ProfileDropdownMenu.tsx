"use client";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import useCreateNavbar from "@/hooks/use-nav-items";
import { NavigationItemType } from "@/types/navigation.types";
import Link from "next/link";
import { UserType } from "@/types/user.types";
import LogOutButtonWrapper from "./LogOutButton";
import Image from "next/image";
import { Session } from "next-auth";

export default function ProfileDropdownMenu({ session }: { session: Session }) {
	const { email, firstName, lastName, role } = session.user as UserType;

	const renderNavItems = useCreateNavbar(
		"user",
		(navItems: NavigationItemType[]) => {
			return navItems
				.filter((item) => item.active)
				.map((item, index) => {
					return (
						<DropdownMenuItem key={index}>
							<Link className="text-left" href={item.path}>
								{item.label}
							</Link>
						</DropdownMenuItem>
					);
				});
		}
	);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
					src={"/images/users/man.png"}
					height={30}
					width={30}
					alt="avatar"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel className="flex items-center gap-2 p-2">
					<Image
						src={"/images/users/man.png"}
						height={30}
						width={30}
						alt="avatar"
					/>
					<div className="flex flex-col">
						<span className=" text-gray-900">
							{firstName} {lastName}
							<small>({role})</small>
						</span>
						<span className="text-xs text-gray-500">{email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{renderNavItems}
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOutButtonWrapper>Log Out</LogOutButtonWrapper>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

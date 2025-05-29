"use client";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ChevronRight, Home, MenuIcon } from "lucide-react";
import Brand from "@/components/Brand";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "@/components/NavButton";
import { signOut } from "../../auth";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LogOutButtonWrapper from "./LogOutButton";
import { Session } from "next-auth";
import { UserType } from "@/types/user.types";
import Image from "next/image";
import DashboardNavigationDrawerItems from "@/components/dashboard/DashboardNavigationDrawerItem";
import { mainNavigationItems } from "@/constants/navigation";

export default function NavigationDrawer({ session }: { session: Session }) {
	const pathname = usePathname();
	const [toggle, setToggle] = useState(false);
	const [toggleDrawer, setToggleDrawer] = useState(false);
	const { email, firstName, lastName, role } = session.user as UserType;

	if (pathname === "/login" || pathname === "/signup") return null;

	return (
		<Drawer direction="left" open={toggleDrawer} onOpenChange={setToggleDrawer}>
			<DrawerTrigger>
				<MenuIcon size={34} className="text-white" />
				<span className="sr-only">nav drawer</span>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="shadow-sm py-1">
					<DrawerTitle className="hidden">Nvigation</DrawerTitle>
					<DrawerDescription className="hidden">
						Navigation drawer
					</DrawerDescription>
					<Brand
						className="text-cyan-700 p-0 py-2"
						onClick={() => setToggleDrawer(false)}
					/>
					{session?.user && (
						<>
							<Separator className="mx-2" />
							<div className="flex items-center gap-2 space-y-1">
								<Image
									src={"/images/users/man.png"}
									height={30}
									width={30}
									alt="avatar"
								/>
								<div className="flex flex-col">
									<span className=" text-gray-900">
										<small>
											{firstName} {lastName}({role})
										</small>
									</span>
									<span className="text-xs text-gray-500">{email}</span>
								</div>
								<Button
									variant={"ghost"}
									size={"icon"}
									className="ml-auto rounded-full"
									onClick={() => {
										setToggle(!toggle);
									}}
								>
									<ChevronRight
										className={cn("text-gray-500 rotate-0 ", {
											"rotate-180": toggle,
										})}
										size={24}
									/>
									<span className="sr-only">menu button</span>
								</Button>
							</div>
						</>
					)}
				</DrawerHeader>
				<motion.nav
					initial={{ scale: 0.6 }}
					whileInView={{ scale: 1 }}
					transition={{ duration: 0.5 }}
					className="flex justify-start items-start flex-col p-0 py-6 gap-1"
				>
					{!toggle ? (
						<>
							{mainNavigationItems.map(({ label, path }) => (
								<NavButton
									pathname={path}
									currentPathname={pathname}
									onClick={() => setToggleDrawer(false)}
									key={path}
								>
									<Link href="/">{label}</Link>
								</NavButton>
							))}
						</>
					) : (
						<DashboardNavigationDrawerItems
							session={session}
							toggleDrawer={setToggleDrawer}
						/>
					)}
				</motion.nav>
				<DrawerFooter className="w-full">
					{session?.user ? (
						<LogOutButtonWrapper>
							<Button
								onClick={async () => {
									await signOut();
									setToggleDrawer(false);
								}}
								className="w-full bg-gradient-to-br from-green-800 to-cyan-600"
							>
								Logout
							</Button>
						</LogOutButtonWrapper>
					) : (
						<div className="flex flex-col gap-3 w-full">
							<Link href="/auth/login">
								<Button variant={"default"} className="w-full">
									Login
								</Button>
							</Link>
							<Link href="/auth/signup">
								<Button variant={"outline"} className="w-full">
									Signup
								</Button>
							</Link>
						</div>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

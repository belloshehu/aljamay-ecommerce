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
import { ChevronRight, Flower, Home, MenuIcon, UserCircle } from "lucide-react";
import Brand from "@/components/Brand";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavButton } from "@/components/NavButton";
import { useSession } from "next-auth/react";
import { signOut } from "../../auth";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";
import LogOutButtonWrapper from "./LogOutButton";

export default function NavigationDrawer() {
	const pathname = usePathname();
	const { data: session } = useSession();

	const [toggle, setToggle] = useState(false);
	const [toggleDrawer, setToggleDrawer] = useState(false);
	if (pathname === "/login" || pathname === "/signup") return null;

	return (
		<Drawer direction="left" open={toggleDrawer} onOpenChange={setToggleDrawer}>
			<DrawerTrigger>
				<MenuIcon size={34} className="text-blue-400ls" />
				<span className="sr-only">nav drawer</span>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="shadow-sm py-3">
					<DrawerTitle className="hidden">Nvigation</DrawerTitle>
					<DrawerDescription className="hidden">
						Navigation drawer
					</DrawerDescription>
					<Brand />
					{session?.user && (
						<>
							<Separator className="mx-2" />
							<div className="flex items-center gap-2 space-y-1">
								<UserCircle size={30} className="text-gray-500" />
								<div className="flex flex-col">
									<span className=" text-gray-900">
										Name: <small>({"role"})</small>
									</span>
									<span className="text-xs text-gray-500">Email:</span>
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
							<NavButton
								pathname="/"
								currentPathname={pathname}
								onClick={() => setToggleDrawer(false)}
							>
								<Home className="text-inherit text-3xl" size={30} />
								<Link href="/">Home</Link>
							</NavButton>
							<NavButton
								pathname="/"
								currentPathname={pathname}
								onClick={() => setToggleDrawer(false)}
							>
								<Flower className="text-inherit text-3xl" size={24} />
								<Link href="/">Order now</Link>
							</NavButton>
						</>
					) : (
						// <NavigationDrawerDashboardItems toggleDrawer={setToggleDrawer} />
						<div>dashboard drawer items</div>
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

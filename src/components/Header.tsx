"use client";
import { ShoppingCart } from "lucide-react";
import Navbar from "./Navbar";
import { Righteous } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartNavItem from "./cart/CartNavItem";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import NavigationDrawer from "./NavigationDrawer";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { Session } from "next-auth";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });

export default function Header({ session }: { session: Session }) {
	const pathname = usePathname();
	const isMobile = useIsMobile();

	if (pathname === "/auth/login" || pathname === "/auth/signup") {
		// Don't render the header on auth pages
		return null;
	}

	return (
		<header className="bg-gradient-to-tr from-green-800 to-cyan-500 flex flex-row items-center w-full justify-between text-white  px-3 py-2  lg:px-16">
			<div className="brand">
				<Link href={"/"}>
					<h1
						className={`${righteous.className} font-bold text-xl lg:text-3xl shadow-lg`}
					>
						Aljamay
					</h1>
				</Link>
			</div>
			<Navbar />
			<div className="block lg:hidden">
				<CartNavItem />
			</div>
			<ShoppingCart
				size={50}
				className="text-3xl text-green-500 place-self-end block lg:hidden"
			/>
			{!isMobile &&
				(session?.user ? (
					<ProfileDropdownMenu session={session} />
				) : (
					<Link href="/auth/login">
						<Button
							variant={"default"}
							size={"lg"}
							className="bg-gradient-to-bl from-cyan-800 to-green-600 hover:from-cyan-700 hover:to-green-500"
						>
							Login
						</Button>
					</Link>
				))}
			{isMobile && (
				// if the user is on mobile, show the main drawer
				// user can open the user drawer from the main drawer
				<NavigationDrawer session={session as Session} />
			)}
		</header>
	);
}

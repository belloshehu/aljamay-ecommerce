import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/Footer";
import AuthContextProvider from "@/providers/AuthContext";
import { auth } from "../../auth";
import { Session } from "next-auth";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Aljamay - home",

	description:
		"Aljamay specialises in various types of spices and confectionery",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthContextProvider>
					<Header session={session as Session} />
					<main>
						{children}
						<Toaster />
					</main>
				</AuthContextProvider>
				<Footer />
			</body>
		</html>
	);
}

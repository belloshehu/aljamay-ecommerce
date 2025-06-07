import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/Footer";
import AuthContextProvider from "@/providers/AuthContext";
import { auth } from "../../auth";
import { Session } from "next-auth";
import CustomQueryClientProvider from "@/providers/CustomQueryClientProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const title = "Aljamay";
const description =
	"Aljamay specialises in various types of spices and confectionery";
const baseUrl = "https://aljamay.com";
const thumbnail = "/images/spices.jpg";
export const metadata = {
	title,
	description,
	openGraph: {
		title,
		description,
		url: baseUrl,
		images: [
			{
				url: thumbnail,
				secureUrl: thumbnail,
				width: 1200,
				height: 630,
				alt: "Preview image for Aljamay",
			},
		],
		type: "website",
		siteName: "Aljamay",
	},
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
				<CustomQueryClientProvider>
					<AuthContextProvider>
						<Header session={session as Session} />
						<main>{children}</main>
						<Toaster />
					</AuthContextProvider>
				</CustomQueryClientProvider>

				<Footer />
			</body>
		</html>
	);
}

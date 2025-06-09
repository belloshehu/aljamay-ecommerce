import {
	Inter,
	Roboto_Mono,
	Anton,
	Righteous,
	Josefin_Slab,
	Jura,
	Alfa_Slab_One,
} from "next/font/google";

// Configure font with subsets and weights
export const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-inter",
});

export const robotoMono = Roboto_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-mono",
});

export const anton = Anton({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-anton",
});

export const righteous = Righteous({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-righteous",
});

export const josefin_slab = Josefin_Slab({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700"],
	variable: "--font-josefin-slab",
});

export const jura = Jura({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-jura",
});

export const alfa_Slab_One = Alfa_Slab_One({
	subsets: ["latin", "latin-ext"],
	weight: ["400"],
	variable: "--font-poppins",
});

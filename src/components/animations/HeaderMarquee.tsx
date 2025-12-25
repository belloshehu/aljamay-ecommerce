"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Marquee from "react-fast-marquee";

export default function HeaderMarquee() {
	return (
		<Marquee>
			<DotLottieReact
				src="animations/celebration.lottie"
				loop
				autoplay
				className="order-1 md:order-2 h-16 w-22"
			/>
			<h3 className="animate-pulse text-[#ADF802] font-bold">
				Happy new year to you our esteemed customers
			</h3>
			<DotLottieReact
				src="animations/fireworks.lottie"
				loop
				autoplay
				className="order-1 md:order-2 h-16 w-22"
			/>
			<DotLottieReact
				src="animations/gift-box.lottie"
				loop
				autoplay
				className="order-1 md:order-2 h-16 w-22"
			/>
		</Marquee>
	);
}

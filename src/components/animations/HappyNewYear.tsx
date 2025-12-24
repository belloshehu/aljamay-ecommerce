"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Dialog, DialogOverlay, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";

export default function HappyNewYear() {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setVisible(false);
		}, 6000);
		return () => clearTimeout(timeOut);
	}, []);

	const isValidMonth = () => {
		// Valid date for displaying new year message is December to January
		const date = new Date();
		return date.getMonth() === 11 || date.getMonth() === 0;
	};

	const isDecember = () => {
		const date = new Date();
		return date.getMonth() === 11;
	};

	return (
		<Dialog modal open={!isValidMonth() || visible}>
			<DialogTrigger>Click heere</DialogTrigger>
			<DialogOverlay className="bg-black/80 justify-center items-center p-5 md:p-20">
				<h1 className="animate-pulse text-3xl md:text-5xl font-bold text-[#ADF802] text-center">
					{isDecember() ? "Happy new year in Advance " : "Happy new Year"}
				</h1>
				<DotLottieReact src="animations/fireworks.lottie" loop autoplay />
			</DialogOverlay>
		</Dialog>
	);
}

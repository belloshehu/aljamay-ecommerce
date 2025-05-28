import "react-awesome-slider/dist/styles.css";
import Slider from "@/components/Slider";
import Link from "next/link";

export default function Hero() {
	return (
		<section className="hero relative min-h-screen w-full flex flex-col-reverse md:flex-row gap-5 lg:gap-10 justify-around md:justify-center items-center p-5 md:px-36 md:py-10 bg-[url(/images/bakery1.jpg)] bg-no-repeat bg-blend-overlay bg-cover bg-left bg-fixed bg-black/60">
			<div className="w-full md:w-3/5 flex flex-col items-center md:items-start gap-5 text-center md:text-left">
				<h1 className="text-white font-extrabold text-3xl lg:text-7xl animate-pulse">
					Products made <span className="text-cyan-400">for healthy</span>{" "}
					refreshment
				</h1>
				<p className="text-slate-100">
					Fresh bread, cakes, spices for your refreshment
				</p>
				<div className="flex justify-center items-center gap-4">
					<Link
						href="/products/categories/bread"
						className="p-4 bg-gradient-to-r from-green-800 to-cyan-500 shadow-lg text-white font-semibold px-7 max-w-fit"
					>
						Buy Confectionery
					</Link>
					<Link
						href="/products/categories/spices"
						className="p-4 bg-gradient-to-r from-green-800 to-cyan-500 shadow-lg text-white font-semibold px-7 max-w-fit"
					>
						Buy Spices
					</Link>
				</div>
			</div>
			<div className="min-h-fit w-full md:w-2/5">
				<Slider />
			</div>
		</section>
	);
}

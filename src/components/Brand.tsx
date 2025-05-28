import { Righteous } from "next/font/google";
import Link from "next/link";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
export const Brand = () => {
	return (
		<div className="">
			<Link href={"/"}>
				<h1 className={`${righteous.className} font-bold text-xl lg:text-2xl`}>
					Aljamay
				</h1>
			</Link>
		</div>
	);
};

export default Brand;

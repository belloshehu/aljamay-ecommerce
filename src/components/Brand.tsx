import { cn } from "@/lib/utils";
import { Righteous } from "next/font/google";
import Link from "next/link";

const righteous = Righteous({ subsets: ["latin"], weight: ["400"] });
export const Brand = ({
	className,
	onClick,
}: {
	className?: string;
	onClick?: () => void;
}) => {
	return (
		<div className={cn("p-5", className)}>
			<Link href={"/"} onClick={onClick}>
				<h1
					className={cn(`${righteous.className} font-bold text-xl lg:text-3xl`)}
				>
					Aljamay
				</h1>
			</Link>
		</div>
	);
};

export default Brand;

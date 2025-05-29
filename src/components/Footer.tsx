import { Brand } from "./Brand";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
	return (
		<footer className="min-h-[20vh] w-full p-5 md:p-20 bg-black text-white">
			<div className="footer flex flex-col md:flex-row gap-10 md:gap-20 justify-start items-start w-full">
				<Brand className="p-0 md:p-5 text-cyan-500" />
				<div className="flex flex-col md:flex-row gap-5 md:gap-10">
					<ul className="list-none p-0">
						<legend className="font-semibold pb-5">Company</legend>

						<li>
							<Link href={"#"}>Career</Link>
						</li>
						<li>
							<Link href={"/products/policies"}>Policies</Link>
						</li>
						<li className="flex items-center">
							PTI staff Quarters, Effurun, Delta.
						</li>
						<ul className="list-none my-3 flex justify-start items-center gap-5">
							<li>
								<Link href={"#"}>
									<Facebook className="w-8 h-8 rounded-full" />
								</Link>
							</li>
							<li>
								<Link href={"#"}>
									<Instagram className="w-8 h-8 rounded-full" />
								</Link>
							</li>
							<li>
								<Link href={"#"}>
									<Youtube className="w-8 h-8 rounded-full" />
								</Link>
							</li>
						</ul>
					</ul>
					<ul className="list-none p-0">
						<legend className="font-semibold pb-5">Products</legend>
						<li>
							<Link href={"#"}>Spices</Link>
						</li>
						<li>
							<Link href={"#"}>Cake</Link>
						</li>
						<li>
							<Link href={"#"}>Bread</Link>
						</li>
						<li>
							<Link href={"#"}>Tea Spices</Link>
						</li>
					</ul>
					<ul className="list-none p-0">
						<legend className="font-semibold pb-5">Services</legend>
						<li>
							<Link href={"#"}>Home Confectionery Training </Link>
						</li>
						<li>
							<Link href={"#"}>Enterprenuership Training</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="text-center mt-20">
				<p> @ {new Date().getFullYear()} Aljamay. All right reserved</p>
			</div>
		</footer>
	);
};

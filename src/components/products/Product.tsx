"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/product.types";

interface ProductProps {
	product: ProductType;
}

export default function Product({ product }: ProductProps) {
	const { data: session } = useSession();
	const router = useRouter();
	const { id, name, image, price, discount } = product;

	const handleAddToShoppingCart = () => {
		if (session) {
			// dispatch(addCartItem(product));
			toast.success(`Added ${product?.name} to shopping cart`);
		} else {
			router.push("/auth/login");
		}
	};

	return (
		<article className="relative flex group flex-col gap-2 w-full shadow-xl max-h-[500px] bg-slate-100 hover:shadow-lg hover:scale-105 duration-200 transition-all">
			<Image
				src={image}
				width={300}
				height={200}
				alt={name}
				className="shadow-lg rounded-t-md w-full h-[100%]"
			/>
			{/* displays status of product whether it is available or not */}
			<div
				className={`absolute top-2 right-2 min-w-fit px-2 rounded-md bg-opacity-50 ${
					status === "available" ? "bg-green-200" : "bg-red-200"
				}`}
			>
				<small>{status}</small>
			</div>

			{/* discount badge */}
			{discount && (
				<div
					className={`absolute top-2 left-2 min-w-fit p-2 w-10 h-10 rounded-full flex items-center justify-center bg-opacity-50 bg-green-200`}
				>
					<small>-{discount}%</small>
				</div>
			)}

			<div className="absolute bottom-0 z-20 flex flex-col w-full">
				<div className="flex justify-between items-center gap-2 mb-1  absolute w-full bottom-0 group-hover:bottom-10">
					<div className="flex items-center gap-2 bg-black  bg-opacity-80 p-1">
						<Link href={`/product/${id}`}>
							<h4 className="text-primary">{name}</h4>
						</Link>
						<h4 className="text-slate-100">#{price}</h4>
					</div>
					<div
						className="flex items-center justify-between gap-3 px-2 cursor-pointer bg-cyan-200 p-1"
						onClick={handleAddToShoppingCart}
					>
						<small className="">add to cart</small>
						<ShoppingBag size={24} className="text-xl text-cyan-900" />
					</div>
				</div>

				<Link
					href={`order/${id}`}
					className="scale-0 group-hover:scale-[100%] w-full p-2 px-7 text-center bg-gradient-to-r from-green-400 to-cyan-500 font-semibold text-white shadow-md duration-150 transition-transform"
				>
					Order now
				</Link>
			</div>
		</article>
	);
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProductType } from "@/types/product.types";
import { getDiscountPercent } from "@/lib/product.utils";
import useRenderFeatures from "@/hooks/use-render-features";
import ProductActionDialog from "./ProductActionDialog";
import { useDeleteProduct } from "@/hooks/service-hooks/product.service.hooks";
import { Badge } from "../ui/badge";

interface ProductProps {
	product: ProductType;
	deleteHandler?: (id: string) => void;
}

export default function Product({ product }: ProductProps) {
	const { isPending, mutate } = useDeleteProduct(product.id);
	const pathname = usePathname();
	const { enabledFeatures, disabledFeatures } = useRenderFeatures(
		["deleteProduct", "editProduct"],
		["orderProduct"],
		pathname === "/dashboard/products"
	);

	const router = useRouter();
	const { id, name, image, price, discount, description, quantity } = product;

	const handleAddToShoppingCart = () => {};

	const handleProductClick = () => {
		router.push(`/products/${id}`);
	};
	const deleteProduct = () => {
		mutate({ productId: id });
	};

	const editProduct = () => {
		console.log("edit product" + id);
	};

	return (
		<div className="relative flex group flex-col items-start gap-2 w-[200px]  hover:shadow-sm hover:scale-105 duration-200 transition-all">
			<Image
				src={image}
				width={200}
				height={200}
				alt={name}
				className="rounded-t-md w-full object-cover cursor-pointer"
				onClick={handleProductClick}
			/>
			{/* displays status of product whether it is available or not */}
			<div
				className={`absolute top-2 right-2 min-w-fit px-2 rounded-md bg-opacity-50 ${
					status === "available" ? "bg-green-200" : "bg-red-200"
				}`}
			>
				<small>{status}</small>
			</div>

			<div className=" flex flex-col w-full p-2">
				<div className="flex items-center justify-start gap-2 p-1">
					<p>
						<small className="uppercase">{name} - </small>
						{description.slice(0, 30)}...
					</p>
				</div>
				<div className="flex items-center justify-between gap-2 p-1 w-full">
					<div className="flex items-center justify-between w-full gap-2">
						<Link href={`/product/${id}`}>
							<h4 className="text-primary">
								<span className="line-through">N</span>
								{price}
							</h4>
						</Link>
						<Badge className="bg-[#ADF802] text-black absolute top-1 right-1">
							-{getDiscountPercent(price, discount)}%
						</Badge>
					</div>
					{/* <div
						className="flex items-center justify-between gap-3 px-2 cursor-pointer bg-[#B6EE56] p-1 rounded-2xl"
						onClick={handleAddToShoppingCart}
					>
						<small className="hidden md:flex">add to cart</small>
						<ShoppingCart size={24} className="text-xl text-cyan-900" />
					</div> */}
				</div>
				<Badge className="bg-black/50">{quantity} in stock</Badge>
			</div>

			{/* Show delete and edit button for admmin only */}
			<div className="flex items-center justify-between p-2">
				{enabledFeatures?.deleteProduct && (
					<ProductActionDialog
						actionType="delete"
						actionHandler={deleteProduct}
						product={product}
						isPending={isPending}
					/>
				)}
				{enabledFeatures?.editProduct && (
					<ProductActionDialog
						actionType="edit"
						actionHandler={editProduct}
						product={product}
					/>
				)}
			</div>
		</div>
	);
}

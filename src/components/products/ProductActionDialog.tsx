"use client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogClose,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import React from "react";
import Loader from "@/components/Loader";
import { Edit, Trash } from "lucide-react";
import { ProductType } from "@/types/product.types";
import Image from "next/image";

export default function ProductActionDialog({
	actionType,
	actionHandler,
	isPending = false,
	product,
}: {
	actionType: "delete" | "edit";
	actionHandler: () => void;
	isPending?: boolean;
	product?: ProductType;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				{actionType === "delete" ? (
					<Button className="bg-gradient-to-br from-red-600 to-cyan-700">
						<Trash /> {actionType}
					</Button>
				) : (
					<Button variant={"secondary"} className="bg-white text-black">
						<Edit /> {actionType}
					</Button>
				)}
			</DialogTrigger>

			<DialogContent className="overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="font-semibold text-black capitalize">
						{actionType} product
					</DialogTitle>
				</DialogHeader>
				{isPending && <Loader />}

				<DialogDescription>
					Are you sure to {actionType} this product ?
					<div className="flex flex-col items-start justify-center text-left w-full my-4">
						<h2 className="font-semibold">{product?.name}</h2>
						<Image
							width={200}
							height={200}
							src={product?.image || ""}
							alt={product?.name || "Product Image"}
							className="w-full h-[200px] object-cover rounded-md my-2"
						/>
						{product?.description && <p>{product.description}</p>}
					</div>
				</DialogDescription>
				{isPending && <Loader message={actionType + "ing ..."} />}

				<DialogFooter>
					<DialogClose asChild>
						<Button>Cancel</Button>
					</DialogClose>
					<Button className="bg-cyan-700 capitalize" onClick={actionHandler}>
						{" "}
						{actionType}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

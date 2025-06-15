import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogClose,
	DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import ProductForm from "./ProuctForm";
import React from "react";

export default function ProductFormDialog({
	heading,
	triggerBtnText,
}: {
	heading?: string;
	triggerBtnText: string;
}) {
	const closeRef = React.useRef<HTMLButtonElement>(null);

	// Function to close the dialog
	const closeDialog = () => {
		// Logic to close the dialog
		if (closeRef.current) {
			closeRef.current.click();
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-[#ADF802] text-black">{triggerBtnText}</Button>
			</DialogTrigger>

			<DialogContent className="h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="font-semibold">{heading}</DialogTitle>
				</DialogHeader>

				<ProductForm closeDialog={closeDialog} />
			</DialogContent>
			<DialogClose hidden ref={closeRef} />
		</Dialog>
	);
}

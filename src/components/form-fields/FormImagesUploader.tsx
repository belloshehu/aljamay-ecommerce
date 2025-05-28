import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { ImagesUploader } from "../ImagesUploader";
import { Control } from "react-hook-form";

interface FormImagesUploaderProps {
	label?: string;
	description?: string;
	className?: string;
	// eslint-disable @typescript-eslint/no-explicit-any
	control: Control<any>;
	name: string;
	maxNumber?: number;
	maxImageSize: number;
	multiple?: boolean;
}

export default function FormImagesUploader({
	control,
	label,
	name,
	maxNumber = 1,
	...props
}: FormImagesUploaderProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<ImagesUploader
							images={field.value}
							setImages={field.onChange}
							withUpdate={true}
							withRemove={true}
							maxNumber={maxNumber}
							{...props}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

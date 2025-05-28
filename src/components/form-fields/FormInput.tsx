import React from "react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

interface FormInputProps {
	id: string;
	label?: string;
	description?: string;
	placeholder: string;
	accept?: string;
	errorMessage?: string | undefined;
	disabled?: boolean;
	type: Exclude<React.HTMLInputTypeAttribute, "password">;
	className?: string;
	value?: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	control: Control<any>;
	step?: number;
	name: string;
}

export default function FormInputField({
	placeholder,
	control,
	label,
	name,
	type,
	errorMessage,
	...props
}: FormInputProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Input
							placeholder={placeholder}
							type={type}
							{...field}
							{...props}
						/>
					</FormControl>
					{errorMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	);
}

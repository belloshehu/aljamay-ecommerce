import React from "react";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Control } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface FormCheckboxProps {
	id: string;
	label?: string;
	description?: string;
	accept?: string;
	errorMessage: string | undefined;
	disabled?: boolean;
	className?: string;
	value?: string;
	control?: Control<any>;
	name: string;
	cols?: number;
	rows?: number;
}

export default function FormCheckbox({
	control,
	label,
	name,
	...props
}: FormCheckboxProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full flex flex-row justify-start itemes-center space-x-2">
					<FormControl>
						<Checkbox checked={field.value} onCheckedChange={field.onChange} />
					</FormControl>
					<div className="space-y-1 leading-none">
						{label && <FormLabel>{label}</FormLabel>}

						{props.description && (
							<FormDescription>{props.description}</FormDescription>
						)}
					</div>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

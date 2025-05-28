import { cn } from "@/lib/utils";
import { SelectDataType } from "@/types/data.types";
import React from "react";
import { Control } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import MultipleSelect from "@/components/MultipleSelect";

interface FormMultiSelectProps {
	placeholder: string;
	options: SelectDataType[];
	className?: string;
	control: Control<any>;
	label: string;
	name: string;
	emptyMessage?: string;
}

export default function FormMultiSelect({
	className,
	placeholder,
	options,
	control,
	label,
	name,
	emptyMessage,
}: FormMultiSelectProps) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("flex flex-col", className)}>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<MultipleSelect
							data={options}
							emptyMessage={emptyMessage}
							placeholder={placeholder}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectDataType } from "@/types/data.types";
import React from "react";
import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

interface SelectProps {
	placeholder?: string;
	emptyMessage?: string;
	options: SelectDataType[];
	className?: string;
	/* eslint-disable @typescript-eslint/no-explicit-any */
	register?: any;
	control: Control<any>;
	label?: string;
}

export default function FormSelect({
	className,
	placeholder,
	options,
	register,
	control,
	label,
	...props
}: SelectProps) {
	return (
		<FormField
			control={control}
			{...register}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<Select
						{...props}
						onValueChange={field.onChange}
						defaultValue={field.value}
					>
						<FormControl>
							<SelectTrigger className="">
								<SelectValue placeholder={placeholder || ""} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className={cn("w-full", className)}>
							{options.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormItem>
			)}
		/>
	);
}

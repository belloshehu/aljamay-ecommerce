import { cn } from "@/lib/utils";
import React from "react";
import { Control } from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "../ui/form";
import { Switch } from "@/components/ui/switch";

interface FormSwitchProps {
	className?: string;
	register?: any;
	//@ts-ignore
	control: Control<any>;
	description: string;
	label: string;
	id: string;
	onChange?: (value: boolean) => void;
	value?: boolean;
}

export default function FormSwitch({
	className,
	control,
	description,
	label,
	onChange,
	value,
}: FormSwitchProps) {
	return (
		<FormField
			control={control}
			name="marketing_emails"
			render={({ field }) => (
				<FormItem
					className={cn(
						"flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",
						className
					)}
				>
					<div className="space-y-0.5">
						<FormLabel>{label}</FormLabel>
						<FormDescription>{description}</FormDescription>
					</div>
					<FormControl>
						<Switch
							checked={value || field.value}
							onCheckedChange={onChange || field.onChange}
						/>
					</FormControl>
				</FormItem>
			)}
		/>
	);
}

"use client";
import FormSelect from "../form-fields/FormSelect";
import { productCategories, productSortOptions } from "@/constants/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import producCategoryAndFilterSchema from "@/schemas/product.validation.schema";
import { Form } from "../ui/form";
import SearchInput from "../form-fields/SearchInput";

export default function ProductCategoryHeader() {
	const form = useForm({
		resolver: zodResolver(producCategoryAndFilterSchema),
		defaultValues: {
			category: "all",
			sortBy: undefined,
		},
	});
	const { control, register } = form;

	return (
		<header className="w-full flex justify-center items-center">
			<Form {...form}>
				<form className="flex justify-center items-center gap-4 p-5 w-full">
					<div className="flex flex-col-reverse md:flex-row items-center justify-center gap-5 capitalize w-full">
						<div className="flex flex-row items-center gap-4">
							<FormSelect
								control={control}
								options={productCategories}
								className="w-full"
								placeholder="Categories"
								register={register("category")}
							/>

							<FormSelect
								control={control}
								options={productSortOptions}
								placeholder="Sort by"
								register={register("sortBy")}
							/>
						</div>
						<SearchInput
							placeholder="Search product"
							className="w-full md:w-1/4"
						/>
					</div>
				</form>
			</Form>
		</header>
	);
}

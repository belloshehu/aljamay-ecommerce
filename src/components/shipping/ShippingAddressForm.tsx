"use client";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	shippingValidationSchemas,
	ShippingValidationSchemaType,
} from "@/schemas/shipping.validation.schemas";
import FormInputField from "../form-fields/FormInput";
import FormCheckbox from "../form-fields/FormCheckbox";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import FormSelect from "../form-fields/FormSelect";
import { statesInNigeria } from "@/constants/data";
import {
	useCreateShippingAddress,
	useUpdateShippingAddress,
} from "@/hooks/service-hooks/shipping.service.hooks";
import Loader from "../Loader";
import { ShippingAddressType } from "@/types/shipping.types";

export default function ShippingAddressForm({
	postSubmitHandler,
	defaultValues,
}: {
	postSubmitHandler: () => void;
	defaultValues?: ShippingAddressType | null;
}) {
	const { mutateAsync, isPending } = useCreateShippingAddress();
	const { mutateAsync: updateAsyn, isPending: isPendingUpdate } =
		useUpdateShippingAddress();
	const form = useForm({
		resolver: zodResolver(shippingValidationSchemas),
		defaultValues: {
			firstName: "",
			lastName: "",
			country: "Nigeria",
			isActive: true,
			isDefault: true,
			...defaultValues, // Use default values if provided
		},
	});

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = form;

	const onSubmit = async (data: ShippingValidationSchemaType) => {
		if (defaultValues) {
			// If defaultValues are provided, update the existing address
			await updateAsyn({ payload: data, shippingAddressId: defaultValues.id });
		} else {
			await mutateAsync({ payload: data });
		}
		reset();
		postSubmitHandler();
	};

	return (
		<Form {...form}>
			<form
				className="w-full flex flex-col gap-5 p-5 bg-white rounded-md"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex flex-col gap-5 md:flex-row w-full justify-between">
					<FormInputField
						control={control}
						name="firstName"
						label="First name"
						type="text"
						id="firstName"
						placeholder="Enter first name"
						errorMessage={errors.firstName?.message}
						className="w-full "
					/>

					<FormInputField
						control={control}
						name="lastName"
						label="Last name"
						type="text"
						id="lastName"
						placeholder="Enter last name"
						errorMessage={errors.lastName?.message}
						className="w-full "
					/>
				</div>
				<FormInputField
					control={control}
					name="streetAddress"
					label="Street Address"
					type="text"
					id="streetAddress"
					placeholder="Enter street address"
					errorMessage={errors.streetAddress?.message}
				/>

				<div className="flex flex-col gap-5 md:flex-row w-full justify-between">
					<FormInputField
						control={control}
						name="country"
						label="Country"
						type="text"
						id="country"
						placeholder="Enter country"
						errorMessage={errors.country?.message}
						disabled={true} // Assuming country is fixed to Nigeria
					/>
					<FormSelect
						control={control}
						register={register("state")}
						label="State"
						options={statesInNigeria}
						className="w-full"
						placeholder="Select state"
					/>
				</div>
				<div className="flex flex-col gap-5 md:flex-row w-full justify-between">
					<FormInputField
						control={control}
						name="city"
						label="City"
						type="text"
						id="city"
						placeholder="Enter city"
						errorMessage={errors.city?.message}
					/>
					<FormInputField
						control={control}
						name="postalCode"
						label="Postal Code"
						type="text"
						id="postalCode"
						placeholder="Enter postal code (optional)"
						errorMessage={errors.postalCode?.message}
					/>
				</div>
				<FormInputField
					control={control}
					name="phoneNumber"
					label="Phone Number"
					type="tel"
					id="phoneNumber"
					placeholder="Enter phone number"
					errorMessage={errors.phoneNumber?.message}
				/>

				<FormCheckbox
					{...register("isDefault")}
					label="Set as default address"
					id="isDefault"
					errorMessage={errors.isDefault?.message}
				/>
				{defaultValues && (
					<FormCheckbox
						{...register("isActive")}
						label="Set as active address"
						id="isActive"
						errorMessage={errors.isActive?.message}
					/>
				)}

				{isPending ? (
					<Loader message={defaultValues ? "updating..." : "Adding..."} />
				) : (
					<Button
						disabled={isPending}
						className={cn("btn btn-primary w-full")}
						type="submit"
					>
						{defaultValues ? "Update Address" : "Add Address"}
					</Button>
				)}
			</form>
		</Form>
	);
}

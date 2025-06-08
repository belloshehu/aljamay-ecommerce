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

export default function ShippingAddressForm() {
	const form = useForm({
		resolver: zodResolver(shippingValidationSchemas),
		defaultValues: {
			firstName: "",
			lastName: "",
			country: "Nigeria",
			isActive: true,
			isDefault: true,
		},
	});

	const isPending = false;
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = form;

	const onSubmit = async (data: ShippingValidationSchemaType) => {
		console.log("Form submitted successfully:", data);
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
					name="addressLine1"
					label="Address Line 1"
					type="text"
					id="addressLine1"
					placeholder="Enter address line 1"
					errorMessage={errors.addressLine1?.message}
				/>
				<FormInputField
					control={control}
					name="addressLine2"
					label="Address Line 2"
					type="text"
					id="addressLine2"
					placeholder="Enter address line 2 (optional)"
					errorMessage={errors.addressLine2?.message}
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
					label="You agree to receive marketing emails"
					id="marketingAccepted"
					errorMessage={errors.isDefault?.message}
				/>

				<Button
					disabled={isPending}
					className={cn("btn btn-primary w-full", {
						"animate-pulse": isPending,
					})}
					type="submit"
				>
					{isPending ? "Saving..." : "Save Address"}
				</Button>
			</form>
		</Form>
	);
}

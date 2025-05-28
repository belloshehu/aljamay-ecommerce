'use client";';
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import signupValidationSchema, {
	SignupValidationSchemaType,
} from "@/schemas/signup.validation.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "../form-fields/FormInput";
import FormPasswordField from "../form-fields/FormPasswordField";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function SignupForm() {
	const form = useForm({
		resolver: zodResolver(signupValidationSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			termsAccepted: false,
			privacyAccepted: false,
			marketingAccepted: false,
		},
	});

	const onSubmit = async (data: SignupValidationSchemaType) => {
		try {
			// Handle signup logic here, e.g., call an API
			console.log("Form submitted successfully:", data);
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	const {
		control,
		handleSubmit,
		formState: { isLoading, errors },
	} = form;

	return (
		<Form {...form}>
			<form
				className={`w-full md:w-3/4 mx-auto shadow-xl md:p-10 p-5 relative space-y-5`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormInputField
					control={control}
					name="email"
					label="Email"
					type="email"
					id="email"
					placeholder="Contact email"
					errorMessage={errors.email?.message}
				/>

				<FormInputField
					control={control}
					name="firstName"
					label="First name"
					type="text"
					id="firstName"
					placeholder="Enter first name"
					errorMessage={errors.firstName?.message}
				/>

				<FormInputField
					control={control}
					name="lastName"
					label="Last name"
					type="text"
					id="lastName"
					placeholder="Enter last name"
					errorMessage={errors.lastName?.message}
				/>

				<FormPasswordField
					control={control}
					name="password"
					label="Password"
					id="password"
					placeholder="Enter password"
					errorMessage={errors.password?.message}
				/>

				<FormPasswordField
					control={control}
					name="passwordRepeat"
					label="Password Repeat"
					id="passwordRepeat"
					placeholder="Enter password again"
					errorMessage={errors.confirmPassword?.message}
				/>
				<Button
					disabled={isLoading}
					className={cn("btn btn-primary w-full", {
						"animate-pulse": isLoading,
					})}
					type="submit"
				>
					{isLoading ? "Loading..." : "Sign Up"}
				</Button>
			</form>
			{/* {error && <FormMessage message={{ text: error, type: "failure" }} />} */}
		</Form>
	);
}

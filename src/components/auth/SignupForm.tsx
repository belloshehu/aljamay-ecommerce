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
import Link from "next/link";
import { toast } from "sonner";
import FormCheckbox from "../form-fields/FormCheckbox";
import { useRouter } from "next/navigation";

export default function SignupForm() {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(signupValidationSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			confirmPassword: "",
			privacyAccepted: false,
			marketingAccepted: true, // Default to true
		},
	});

	const onSubmit = async (data: SignupValidationSchemaType) => {
		// Handle signup logic here, e.g., call an API
		console.log("Form submitted successfully:", data);
		fetch(`/api/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(async (res) => {
				const data = await res.json();
				if (res.ok) {
					toast.success("Successfully signed up");
					router.push("/auth/login");
				} else {
					console.log(data);
					toast.error(data.message || "Failed to sign up");
				}
			})
			.catch((err) => {
				console.error("Signup error:", err);
				toast.error(err.response.data.message || "Failed to sign up");
			});
	};

	const {
		control,
		handleSubmit,
		register,
		formState: { isLoading, errors },
	} = form;

	return (
		<Form {...form}>
			<form
				className={`w-full md:w-3/4 mx-auto md:shadow-xl md:p-10 p-5 relative space-y-5`}
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
					name="confirmPassword"
					label="Confirm Password"
					id="confirmRepeat"
					placeholder="Enter password again"
					errorMessage={errors.confirmPassword?.message}
				/>
				<FormCheckbox
					{...register("marketingAccepted")}
					label="You agree to receive marketing emails"
					id="marketingAccepted"
					errorMessage={errors.marketingAccepted?.message}
				/>
				<FormCheckbox
					{...register("privacyAccepted")}
					label="You agree to accept our privacy policy"
					id="privacyAccepted"
					errorMessage={errors.privacyAccepted?.message}
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
			<div className="flex justify-evenly items-center mt-5">
				<p>Have an account?</p>
				<Link href={"/auth/login"}>
					<Button className=" bg-cyan-600 rounded-md text-white">Login</Button>
				</Link>
			</div>
		</Form>
	);
}

"use client";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import FormPasswordField from "../form-fields/FormPasswordField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/schemas/login.validation.schemas";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { signInAction } from "@/app/actions/auth.action";
import { useSearchParams } from "next/navigation";
import FormMessage from "../FormMessage";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
	const [error, formAction, isPending] = useActionState(
		signInAction,
		undefined
	);
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		resolver: zodResolver(loginValidationSchema),
	});

	const {
		control,
		formState: { errors, isLoading },
	} = form;

	return (
		<Form {...form}>
			<form
				className={`w-full md:w-3/4 mx-auto shadow-xl md:p-10 p-5 relative space-y-5`}
				action={formAction}
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

				<FormPasswordField
					control={control}
					name="password"
					label="Password"
					id="password"
					placeholder="Enter password"
					errorMessage={errors.password?.message}
				/>

				<Button
					disabled={isLoading}
					className={cn("btn btn-primary w-full", {
						"animate-pulse": isPending,
					})}
					type="submit"
				>
					{isPending ? "Loading..." : "Login"}
				</Button>
				<input type="hidden" name="redirectTo" value={callbackUrl} />
			</form>
			{isLoading} {isPending}
			{error && <FormMessage message={{ text: error, type: "failure" }} />}
		</Form>
	);
}

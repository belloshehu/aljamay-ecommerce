"use client";
import { useForm } from "react-hook-form";
import FormInputField from "../form-fields/FormInput";
import FormPasswordField from "../form-fields/FormPasswordField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginValidationSchema from "@/schemas/login.validation.schemas";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { signInAction } from "@/app/actions/auth.action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
	const [error, formAction, isPending] = useActionState(
		signInAction,
		undefined
	);

	useEffect(() => {
		error && toast.error(error || "Failed to login");
	}, [error]);

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
				className={`w-full md:w-3/4 mx-auto md:shadow-xl md:p-10 p-5 relative space-y-5`}
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
			<div className="flex justify-evenly items-center mt-5">
				<p>Have no account?</p>
				<Link href={"/auth/signup"}>
					<Button className=" bg-cyan-600 rounded-md text-white">
						Sign Up
					</Button>
				</Link>
			</div>
		</Form>
	);
}

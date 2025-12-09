'use client";';
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormPasswordField from "../form-fields/FormPasswordField";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
	ResetPasswordSchemaType,
	resetPasswordValidationSchema,
} from "@/schemas/password-reset.validation.schema";

export default function PasswordResetForm() {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(resetPasswordValidationSchema),
		defaultValues: {
			password: "",
			passwordRepeat: "",
		},
	});

	const onSubmit = async (data: ResetPasswordSchemaType) => {
		// Handle signup logic here, e.g., call an API
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
					toast.success("Password reset successful");
					router.push("/protected/password-reset/reset");
				} else {
					toast.error(data.message || "Failed to sign up");
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message || "Failed to sign up");
			});
	};

	const {
		control,
		handleSubmit,
		formState: { isLoading, errors },
	} = form;

	return (
		<Form {...form}>
			<form
				className={`w-full md:w-3/4 mx-auto md:shadow-xl md:p-10 p-5 relative space-y-5`}
				onSubmit={handleSubmit(onSubmit)}
			>
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
					label="Confirm Password"
					id="passwordRepeat"
					placeholder="Enter password again"
					errorMessage={errors.passwordRepeat?.message}
				/>

				<Button
					disabled={isLoading}
					className={cn("btn btn-primary w-full", {
						"animate-pulse": isLoading,
					})}
					type="submit"
				>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
			</form>
			<div className="flex justify-evenly items-center mt-5">
				<Link href={"/auth/login"}>
					<Button className=" bg-cyan-600 rounded-md text-white">Login</Button>
				</Link>
			</div>
		</Form>
	);
}

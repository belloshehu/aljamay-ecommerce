"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "../../../auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

// ...

async function signInAction(prevState: string | undefined, formData: FormData) {
	try {
		await signIn("credentials", formData, { redirect: "/dashboard" });
	} catch (error) {
		if (error instanceof AuthError) {
			// console.log("AuthError:", error.message, error.type);
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid email or password.";
				case "EmailSignInError":
					return "Invalid email address.";
				default:
					return "Invalid email or password.";
			}
		}
		throw error;
	}
}

async function signOutAction() {
	try {
		await signOut();
	} catch (error) {
		if (isRedirectError(error)) {
			console.error("Redirect error!: ", error);
			throw error;
		}
	} finally {
		redirect("/auth/login");
	}
}

export { signInAction, signOutAction };

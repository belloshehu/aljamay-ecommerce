import { z } from "zod";
// This schema is used for validating user signup data
// It checks for valid email, password length, and acceptance of terms and conditions
// and privacy policy, with optional marketing acceptance.

const signupValidationSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" }),
	confirmPassword: z
		.string()
		.min(8, { message: "Confirm password must be at least 8 characters long" }),
	termsAccepted: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms and conditions",
	}),
	privacyAccepted: z.boolean().refine((val) => val === true, {
		message: "You must accept the privacy policy",
	}),
	marketingAccepted: z.boolean().optional(),
});
export type SignupValidationSchemaType = z.infer<typeof signupValidationSchema>;
export default signupValidationSchema;

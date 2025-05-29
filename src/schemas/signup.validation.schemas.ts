import { z } from "zod";
// This schema is used for validating user signup data
// It checks for valid email, password length, and acceptance of terms and conditions
// and privacy policy, with optional marketing acceptance.

const signupValidationSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address" }),
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		password: z
			.string()
			.regex(
				/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
				"Password must contain atleat: 1 lower case, 1 upper case, 1 special character "
			),
		confirmPassword: z.string(),
		// termsAccepted: z.boolean().refine((val) => val === true, {
		// 	message: "You must accept the terms and conditions",
		// }),
		privacyAccepted: z.boolean().refine((val) => val === true, {
			message: "You must accept the privacy policy",
		}),
		marketingAccepted: z.boolean().optional().default(true),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

export type SignupValidationSchemaType = z.infer<typeof signupValidationSchema>;
export default signupValidationSchema;

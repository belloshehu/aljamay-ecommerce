import { z } from "zod";

//validation schema for password reset form
export const resetPasswordValidationSchema = z
	.object({
		password: z
			.string()
			.regex(
				/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
				"Password must contain atleat: 1 lower case, 1 upper case, 1 special character "
			)

			.min(8)
			.max(16),
		passwordRepeat: z
			.string()
			.regex(
				/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
				"Password must contain atleat: 1 lower case, 1 upper case, 1 special character "
			)
			.min(8)
			.max(16),
	})
	.refine(
		(data) => {
			return data.password === data.passwordRepeat;
		},
		{
			message: "Passwords do not match",
			path: ["passwordRepeat"],
		}
	);

export const resetPasswordRequestValidationSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export type ResetPasswordSchemaType = z.infer<
	typeof resetPasswordValidationSchema
>;

export type ResetPasswordRequestSchemaType = z.infer<
	typeof resetPasswordRequestValidationSchema
>;

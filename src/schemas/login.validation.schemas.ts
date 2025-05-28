import z from "zod";

const loginValidationSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters long" }),
	rememberMe: z.boolean().optional(),
});

export type LoginValidationSchemaType = z.infer<typeof loginValidationSchema>;
export default loginValidationSchema;

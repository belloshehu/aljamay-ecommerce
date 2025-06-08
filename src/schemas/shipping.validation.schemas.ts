import { z } from "zod";

export const shippingValidationSchemas = z.object({
	firstName: z.string().min(1, { message: "Name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	addressLine1: z.string().min(1, { message: "Address is required" }),
	addressLine2: z.string().optional(),
	city: z.string().min(1, { message: "City is required" }),
	state: z.string().min(1, { message: "State is required" }),
	country: z.string().min(1, { message: "Country is required" }),
	phoneNumber: z.string().min(1, { message: "Phone number is required" }),
	postalCode: z.string().optional(),
	isDefault: z.boolean().default(false),
	isActive: z.boolean().default(true),
});

export type ShippingValidationSchemaType = z.infer<
	typeof shippingValidationSchemas
>;

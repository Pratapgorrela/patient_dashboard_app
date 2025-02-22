import { z } from "zod";

export const UserOtpValidation = z.object({
	passkey: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

export const DefaultTimeFormValidation = z.object({
	from: z.date({
		required_error: "Invalid start time",
	}),
	till: z.date({
		required_error: "Invalid end time",
	}),
});

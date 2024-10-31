import { z } from "zod";

export const UserOtpValidation = z.object({
	passkey: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
});

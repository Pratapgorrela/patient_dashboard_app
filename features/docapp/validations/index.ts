import { z } from "zod";

export const TimeCardFormValidation = z.object({
	status: z.string(),
	availability: z.string(),
	from: z.date().optional(),
	till: z.date().optional(),
	details: z.string().optional(),
});

import { z } from "zod";

export const ClientSchema = z.object({
	client: z.string().min(2, "Please select Hospital"),
	userType: z.string(),
});

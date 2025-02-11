import { z } from "zod";

export const pointSchema = z
	.object({
		points: z.number(),
	})
	.strict();

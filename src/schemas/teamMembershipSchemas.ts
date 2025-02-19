import { z } from "zod";

export const teamMembershipSchema = z
	.object({
		teenId: z.number(),
		teamId: z.number(),
		seasonId: z.number(),
	})
	.strict();

export const teamMembershipSchemaUpdate = z
	.object({
		teamId: z.number(),
	})
	.strict();

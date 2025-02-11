import { z } from "zod";

export const attendanceSchema = z
	.object({
		meetingId: z.number(),
		teamMembershipId: z.number(),
	})
	.strict();

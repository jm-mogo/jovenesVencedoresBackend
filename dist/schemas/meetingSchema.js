import { z } from "zod";
export const meetingSchema = z
    .object({
    name: z.string(),
    seasonId: z.number(),
})
    .strict();
//# sourceMappingURL=meetingSchema.js.map
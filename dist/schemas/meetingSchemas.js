import { z } from "zod";
export const meetingCreateSchema = z
    .object({
    date: z.string().datetime(),
    seasonId: z.number(),
})
    .strict();
export const meetingUpdateSchema = z
    .object({
    date: z.string().datetime(),
})
    .strict();
//# sourceMappingURL=meetingSchemas.js.map
import { z } from "zod";
export const teamCreateSchema = z
    .object({
    name: z.string(),
    seasonId: z.number(),
})
    .strict();
export const teamUpdateSchema = z
    .object({
    name: z.string().optional(),
    seasonId: z.number().optional(),
})
    .strict();
//# sourceMappingURL=teamSchemas.js.map
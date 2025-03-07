import { z } from "zod";
export const seasonSchema = z
    .object({
    name: z.string(),
    description: z.string().optional(),
})
    .strict();
export const seasonUpdateSchema = z
    .object({
    name: z.string().optional(),
    description: z.string().optional(),
})
    .strict();
//# sourceMappingURL=seasonsSchemas.js.map
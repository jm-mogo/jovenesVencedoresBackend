import { z } from "zod";
export const groupCreateSchema = z
    .object({
    name: z.string(),
    churchName: z.string(),
})
    .strict();
export const groupUpdateSchema = z
    .object({
    name: z.string().optional(),
    churchName: z.string().optional(),
})
    .strict();
//# sourceMappingURL=groupSchemas.js.map
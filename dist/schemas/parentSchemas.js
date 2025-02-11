import { z } from "zod";
export const parentCreateSchema = z
    .object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().length(11).optional(),
})
    .strict();
export const parentUpdateSchema = z
    .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phoneNumber: z.string().length(11).optional(),
})
    .strict();
//# sourceMappingURL=parentSchemas.js.map
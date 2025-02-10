import { z } from "zod";
export const seasonSchema = z
    .object({
    name: z.string(),
})
    .strict();
//# sourceMappingURL=seasonsSchemas.js.map
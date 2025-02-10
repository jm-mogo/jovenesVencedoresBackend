import { z } from "zod";
import { Role } from "@prisma/client";
export const userRegistrationSchema = z
    .object({
    username: z.string(),
    password: z.string().min(6),
    role: z.nativeEnum(Role),
    groupId: z.number(),
})
    .strict();
export const userLoginSchema = z
    .object({
    username: z.string(),
    password: z.string().min(6),
})
    .strict();
export const userUpdateSchema = z
    .object({
    username: z.string().optional(),
    password: z.string().min(6).optional(),
    role: z.nativeEnum(Role).optional(),
})
    .strict();
//# sourceMappingURL=userSchemas.js.map
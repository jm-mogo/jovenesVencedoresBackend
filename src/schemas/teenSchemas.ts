import { Gender } from "@prisma/client";
import { z } from "zod";

export const teenCreateSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		gender: z.nativeEnum(Gender),
		dateOfBirth: z.string().datetime(),
		address: z.string().optional(),
		phoneNumber: z.string().length(11).optional(),
		parentId: z.number(),
	})
	.strict();

export const teenUpdateSchema = z
	.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		gender: z.nativeEnum(Gender).optional(),
		dateOfBirth: z.string().datetime().optional(),
		address: z.string().optional(),
		phoneNumber: z.string().length(11).optional(),
		parentId: z.number().optional(),
	})
	.strict();

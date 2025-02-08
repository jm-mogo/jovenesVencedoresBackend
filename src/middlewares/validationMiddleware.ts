import { Role, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { userServices } from "../services/userServices.js";

const PRIMARY_OWNER = "primaryOwner";
const OWNER = "owner";
const ADMIN = "admin";

export function validateAuthorization(role: Role) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userAuth: Partial<User> = { ...req.user };

			const rolesAllowed: Role[] = [];

			switch (role) {
				case PRIMARY_OWNER:
					rolesAllowed.push(PRIMARY_OWNER);
					break;
				case OWNER:
					rolesAllowed.push(PRIMARY_OWNER, OWNER);
					break;
				case ADMIN:
					rolesAllowed.push(PRIMARY_OWNER, OWNER, ADMIN);
			}

			const isAuthrorized = await userServices.checkAuthorization(
				userAuth,
				rolesAllowed
			);

			if (!isAuthrorized) {
				res.status(401).json();
				return;
			}

			next();
		} catch (err) {
			next(err);
		}
	};
}

export function validateData(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errorMessages = error.errors.map((issue: any) => ({
					message: `${issue.path.join(".")} is ${issue.message}`,
				}));
				res.status(400).json({
					error: "Invalid data",
					details: errorMessages,
				});
			} else {
				res.status(500).json({
					error: "Internal Server Error",
				});
			}
		}
	};
}

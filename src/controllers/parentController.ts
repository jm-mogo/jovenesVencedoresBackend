import { Parent, PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { parentServises } from "../services/parentServices.js";
const prisma = new PrismaClient();

const createParent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		if (!userAuth.groupId) {
			res.status(401).json("Unauthorized");
			return;
		}
		const parentBody = { ...req.body };
		parentBody.groupId = userAuth.groupId;

		const parent = await parentServises.createParent(parentBody);

		res.status(201).json({
			message: "Parent created",
			data: parent,
		});
	} catch (err) {
		next(err);
	}
};

const getParents = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		if (!userAuth.groupId) {
			res.status(401).json("Unauthorized");
			return;
		}

		const parents = await parentServises.getParents(userAuth.groupId);
		res.json({ data: parents });
	} catch (err) {
		next(err);
	}
};

const getParent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const parentId: number = Number(req.params.id);
		const parent = await parentServises.getParent(parentId);
		res.json({ data: parent });
	} catch (err) {
		next(err);
	}
};

const updateParent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parentId: number = Number(req.params.id);
		const parentBody: Parent = { ...req.body };

		const parentUpdated = await parentServises.updateParent(
			parentId,
			parentBody
		);
		res.status(200).json({
			message: "updated successfully",
			data: parentUpdated,
		});
	} catch (err) {
		next(err);
	}
};

const deleteParent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const parentId: number = Number(req.params.id);
		await parentServises.deleteParent(parentId);
		res.status(204).json({ message: "Parent deleted" });
	} catch (err) {
		next(err);
	}
};

export { getParents, getParent, createParent, deleteParent, updateParent };

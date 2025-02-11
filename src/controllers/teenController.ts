import { Teen, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { teenServices } from "../services/teenServices.js";

const createTeen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		if (!userAuth.groupId) {
			res.status(401).json("Unauthorized");
			return;
		}

		const teenBody: Teen = { ...req.body };
		teenBody.dateOfBirth = new Date(teenBody.dateOfBirth);
		teenBody.groupId = userAuth.groupId;

		const teen = await teenServices.createTeen(teenBody);

		res.status(201).json({
			messsage: "Teen created",
			data: teen,
		});
	} catch (err) {
		next(err);
	}
};

const getTeens = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		if (!userAuth.groupId) {
			res.status(401).json("Unauthorized");
			return;
		}

		const teens = await teenServices.getTeens(userAuth.groupId);
		res.json({ data: teens });
	} catch (err) {
		next(err);
	}
};

const getTeen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teenId: number = Number(req.params.id);

		const userAuth: Partial<User> = { ...req.user };
		const hasAccess = await teenServices.canAccessTeen(userAuth, teenId);

		if (!hasAccess) {
			res.status(403).json("Forbidden");
			return;
		}

		const teen = await teenServices.getTeen(teenId);

		if (!teen) {
			res.status(404).json("Teen not found");
			return;
		}

		res.json(teen);
	} catch (err) {
		next(err);
	}
};

const updateTeen = async (req: Request, res: Response, next: NextFunction) => {
	const teenId: number = Number(req.params.id);
	try {
		const teenUpdated = await teenServices.updateTeen(teenId, req.body);
		res.json({
			message: "Teen updated",
			teen: teenUpdated,
		});
	} catch (err) {
		next(err);
	}
};

const deleteTeen = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const teenId: number = Number(req.params.id);

		//Check if this user can acces this teen
		const userAuth: Partial<User> = { ...req.user };
		const hasAccess = await teenServices.canAccessTeen(userAuth, teenId);

		if (!hasAccess) {
			res.status(403).json("Forbidden");
			return;
		}

		await teenServices.deleteTeen(teenId);

		res.status(204).json();
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
};

export { getTeens, getTeen, createTeen, deleteTeen, updateTeen };

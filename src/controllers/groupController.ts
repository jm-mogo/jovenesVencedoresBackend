import { NextFunction, Request, Response } from "express";
import { groupServices } from "../services/groupServices.js";
import { Group, User } from "@prisma/client";

const createGroup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const groupBody: Group = { ...req.body };

		const group = await groupServices.createGroup(groupBody);
		res.status(201).json({ message: "Group created", data: group });
	} catch (err) {
		next(err);
	}
};

const getGroups = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const groups = await groupServices.getGroups();
		res.json({ data: groups });
		return;
	} catch (err) {
		next(err);
	}
};

const getGroup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const group = await groupServices.getGroup(id);
		if (!group) {
			res.status(404).json({ message: "Group not found" });
			return;
		}
		res.json({ data: group });
	} catch (err) {
		next(err);
	}
};

const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = Number(req.params.id);
		const groupBody: Partial<Group> = { ...req.body };
		const updatedGroup = await groupServices.updateGroup(id, groupBody);

		if (!updatedGroup) {
			res.status(404).json({ message: "Group not found" });
			return;
		}

		res.status(200).json({ message: "Group updated", data: updatedGroup });
	} catch (err) {
		next(err);
	}
};

const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
	const id = Number(req.params.id);
	try {
		const groupDeleted = await groupServices.deleteGroup(id);
		if (!groupDeleted) {
			res.status(404).json({ message: "Group not found" });
			return;
		}
		res.status(204).json({ message: "Group deleted", data: groupDeleted });
	} catch (err) {
		next(err);
	}
};

export { createGroup, getGroups, getGroup, updateGroup, deleteGroup };

import teamMembership from "../routers/teamMembershipRouter.js";
import { NextFunction, Request, Response } from "express";
import { seasonServices } from "../services/seasonServices.js";
import { Season, User } from "@prisma/client";

const createSeason = async (
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

		const seasonBody: Season = { ...req.body };
		seasonBody.groupId = userAuth.groupId;

		const season = await seasonServices.createSeason(seasonBody);
		res.status(201).json({
			message: "Season created",
			data: season,
		});
	} catch (err) {
		next(err);
	}
};

const getSeasons = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		if (!userAuth.groupId) {
			res.status(401).json("Unauthorized");
			return;
		}

		const seasons = await seasonServices.getSeasons(userAuth.groupId);

		res.json({ data: seasons });
	} catch (err) {
		next(err);
	}
};

const getSeason = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const seasonId: number = Number(req.params.id);

		const season = await seasonServices.getSeason(seasonId);

		if (!season) {
			res.status(404).json({ message: "Season not found" });
			return;
		}

		res.json({ data: season });
	} catch (err) {
		next(err);
	}
};

const getTeamsInSeason = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const seasonId: number = Number(req.params.id);

		const teams = await seasonServices.getTeamsInSeason(seasonId);

		res.json({ data: teams });
	} catch (err) {
		next(err);
	}
};

const getTeensNotInSeason = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const seasonId: number = Number(req.params.id);
		const teens = await seasonServices.getTeensNotInSeason(seasonId);
		res.json({ data: teens });
	} catch (err) {
		next(err);
	}
};

const updateSeason = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const seasonBody = { ...req.body };

		const seasonId: number = Number(req.params.id);
		const seasonUpdated = await seasonServices.updateSeason(
			seasonId,
			seasonBody
		);

		res.status(200).json({
			message: "Season updated",
			data: seasonUpdated,
		});
	} catch (err) {
		next(err);
	}
};

const deleteSeason = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const seasonId: number = Number(req.params.id);
		const seasonDeleted = await seasonServices.deleteSeason(seasonId);

		if (!seasonDeleted) {
			res.status(404).json({ message: "Season not found" });
			return;
		}

		res.status(204).json();
	} catch (err) {
		next(err);
	}
};

export {
	createSeason,
	getSeasons,
	getSeason,
	getTeamsInSeason,
	getTeensNotInSeason,
	updateSeason,
	deleteSeason,
};

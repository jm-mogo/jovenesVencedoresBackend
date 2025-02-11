import { PrismaClient, TeamMembership } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { teamMembershipServices } from "../services/teamMembershipServices.js";

const prisma = new PrismaClient();

const createTeamMembership = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const teamMembershipBody: TeamMembership = { ...req.body };

		const teamMembership =
			await teamMembershipServices.createTeamMembership(
				teamMembershipBody
			);

		res.status(201).json({
			message: "Team membership created",
			data: teamMembership,
		});
	} catch (err) {
		next(err);
	}
};

const deleteTeamMembership = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const teamMembershipId = Number(req.params.id);
		await teamMembershipServices.deleteTeamMembershipById(teamMembershipId);
		res.status(204).json({ message: "Team membership deleted" });
	} catch (err) {
		next(err);
	}
};

export { createTeamMembership, deleteTeamMembership };

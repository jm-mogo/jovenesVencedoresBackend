import { PrismaClient } from "@prisma/client";
import { teamMembershipServices } from "../services/teamMembershipServices.js";
const prisma = new PrismaClient();
const createTeamMembership = async (req, res, next) => {
    try {
        const teamMembershipBody = { ...req.body };
        const teamMembership = await teamMembershipServices.createTeamMembership(teamMembershipBody);
        res.status(201).json({
            message: "Team membership created",
            data: teamMembership,
        });
    }
    catch (err) {
        next(err);
    }
};
const updateTeamMembership = async (req, res, next) => {
    try {
        const teamMembershipId = Number(req.params.id);
        const teamMembershipBody = { ...req.body };
        const teamMembership = await teamMembershipServices.updateTeamMembership(teamMembershipId, teamMembershipBody);
        res.status(200).json({
            message: "Team membership updated",
            data: teamMembership,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteTeamMembership = async (req, res, next) => {
    try {
        const teamMembershipId = Number(req.params.id);
        await teamMembershipServices.deleteTeamMembershipById(teamMembershipId);
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { createTeamMembership, deleteTeamMembership, updateTeamMembership };
//# sourceMappingURL=teamMembershipController.js.map
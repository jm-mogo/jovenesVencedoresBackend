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
const deleteTeamMembership = async (req, res, next) => {
    try {
        const teamMembershipId = Number(req.params.id);
        await teamMembershipServices.deleteTeamMembershipById(teamMembershipId);
        res.status(204).json({ message: "Team membership deleted" });
    }
    catch (err) {
        next(err);
    }
};
export { createTeamMembership, deleteTeamMembership };
//# sourceMappingURL=teamMembershipController.js.map
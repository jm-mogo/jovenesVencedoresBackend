import { Router } from "express";
import { createTeamMembership, deleteTeamMembershipById, } from "../controllers/teamMembershipController.js";
const teamMembership = Router();
teamMembership.post("/", async (req, res) => {
    try {
        const newTeamMembership = await createTeamMembership(req.body);
        res.status(201).json({
            message: "Team membership created successfully",
            teamMembership: newTeamMembership,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
teamMembership.delete("/:id", async (req, res) => {
    try {
        const teamMembershipId = Number(req.params.id);
        await deleteTeamMembershipById(teamMembershipId);
        res.json({ message: "Team membership deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default teamMembership;
//# sourceMappingURL=teamMembershipRouter.js.map
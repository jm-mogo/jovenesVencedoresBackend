import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getAllTeams, getTeamById, createTeam, updateTeamById, deleteTeamById, getTeamMembersById, } from "../controllers/teamController.js";
const teamRouter = Router();
// Validation middleware
const validateTeam = [
    body("name").notEmpty().withMessage("Team name is required"),
    body("seasonId").isInt().withMessage("Season ID must be an integer"),
];
teamRouter.get("/", async (req, res) => {
    try {
        const teams = await getAllTeams();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch teams" });
    }
});
teamRouter.get("/:id", async (req, res) => {
    try {
        const teamId = Number(req.params.id);
        const team = await getTeamById(teamId);
        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch team" });
    }
});
teamRouter.get("/:id/members", async (req, res) => {
    try {
        const teamId = Number(req.params.id);
        const members = await getTeamMembersById(teamId);
        if (!members) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch members" });
    }
});
teamRouter.post("/", validateTeam, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, seasonId } = req.body;
        const newTeam = await createTeam({ name, seasonId });
        res.status(201).json(newTeam);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create team" });
    }
});
teamRouter.put("/:id", validateTeam, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const teamId = Number(req.params.id);
        const { name } = req.body;
        const updatedTeam = await updateTeamById(teamId, { name });
        if (!updatedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json({ message: "Team updated successfully", team: updatedTeam });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update team" });
    }
});
teamRouter.delete("/:id", async (req, res) => {
    try {
        const teamId = Number(req.params.id);
        const deletedTeam = await deleteTeamById(teamId);
        if (!deletedTeam) {
            return res.status(404).json({ error: "Team not found" });
        }
        res.json({ message: "Team deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete team" });
    }
});
export default teamRouter;
//# sourceMappingURL=teamRouter.js.map
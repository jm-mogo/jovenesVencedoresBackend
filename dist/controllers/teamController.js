import { PrismaClient } from "@prisma/client";
import { teamServices } from "../services/teamservices.js";
const prisma = new PrismaClient();
const createTeam = async (req, res, next) => {
    try {
        const teamBody = { ...req.body };
        const team = await teamServices.createTeam(teamBody);
        res.status(201).json({ message: "Team created", data: team });
    }
    catch (err) {
        next(err);
    }
};
const getTeams = async (req, res, next) => {
    try {
        const { seasonId } = req.body;
        const teams = await teamServices.getTeams(seasonId);
        res.json({ data: teams });
    }
    catch (err) {
        next(err);
    }
};
const getTeam = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id);
        const team = await teamServices.getTeam(teamId);
        if (!team) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.json({ data: team });
    }
    catch (err) {
        next(err);
    }
};
const getMembers = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id);
        const members = await teamServices.getMembers(teamId);
        if (!members) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.json(members);
    }
    catch (err) {
        next(err);
    }
};
const updateTeam = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id);
        const teamBody = { ...req.body };
        const updatedTeam = await teamServices.updateTeam(teamId, teamBody);
        if (!updatedTeam) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.json({ message: "Team updated", data: updatedTeam });
    }
    catch (err) {
        next(err);
    }
};
const deleteTeam = async (req, res, next) => {
    try {
        const teamId = Number(req.params.id);
        const deletedTeam = await teamServices.deleteTeam(teamId);
        if (!deletedTeam) {
            res.status(404).json({ error: "Team not found" });
            return;
        }
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { getTeams, getTeam, createTeam, updateTeam, deleteTeam, getMembers };
//# sourceMappingURL=teamController.js.map
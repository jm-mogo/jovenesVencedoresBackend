import { Router } from "express";
import {
	getAllSeasons,
	getSeasonById,
	createSeason,
	updateSeasonById,
	deleteSeasonById,
	getTeamsBySeasonId,
	getTeensWithoutTeamInSeason,
} from "../controllers/seasonController.js";

const seasonRouter = Router();

seasonRouter.get("/", async (req, res) => {
	const seasons = await getAllSeasons();
	res.json(seasons);
});

seasonRouter.get("/:id", async (req, res) => {
	const seasonId: number = Number(req.params.id);
	const season = await getSeasonById(seasonId);
	res.json(season);
});

seasonRouter.get("/:id/teams", async (req, res) => {
	const seasonId: number = Number(req.params.id);
	const teams = await getTeamsBySeasonId(seasonId);
	res.json(teams);
});

seasonRouter.get("/:id/teens", async (req, res) => {
	const seasonId: number = Number(req.params.id);
	const teens = await getTeensWithoutTeamInSeason(seasonId);
	res.json(teens);
});

seasonRouter.post("/", async (req, res) => {
	try {
		const { name } = req.body;
		const season = await createSeason(name);
		res.status(201).json({
			message: "Season created successfully",
			season,
		});
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

seasonRouter.put("/:id", async (req, res) => {
	try {
		const seasonId: number = Number(req.params.id);
		const seasonUpdated = await updateSeasonById(seasonId, req.body);
		res.status(200).json({
			message: "Season updated successfully",
			season: seasonUpdated,
		});
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

seasonRouter.delete("/:id", async (req, res) => {
	try {
		const seasonId: number = Number(req.params.id);
		await deleteSeasonById(seasonId);
		res.status(204).json({ message: "Season deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

export default seasonRouter;

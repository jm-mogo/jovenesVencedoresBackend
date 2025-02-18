import { seasonServices } from "../services/seasonServices.js";
const createSeason = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        if (!userAuth.groupId) {
            res.status(401).json("Unauthorized");
            return;
        }
        const seasonBody = { ...req.body };
        seasonBody.groupId = userAuth.groupId;
        const season = await seasonServices.createSeason(seasonBody);
        res.status(201).json({
            message: "Season created",
            data: season,
        });
    }
    catch (err) {
        next(err);
    }
};
const getSeasons = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        if (!userAuth.groupId) {
            res.status(401).json("Unauthorized");
            return;
        }
        const seasons = await seasonServices.getSeasons(userAuth.groupId);
        res.json({ data: seasons });
    }
    catch (err) {
        next(err);
    }
};
const getSeason = async (req, res, next) => {
    try {
        const seasonId = Number(req.params.id);
        const season = await seasonServices.getSeason(seasonId);
        if (!season) {
            res.status(404).json({ message: "Season not found" });
            return;
        }
        res.json(season);
    }
    catch (err) {
        next(err);
    }
};
const getTeamsInSeason = async (req, res, next) => {
    try {
        const seasonId = Number(req.params.id);
        const teams = await seasonServices.getTeamsInSeason(seasonId);
        res.json({ data: teams });
    }
    catch (err) {
        next(err);
    }
};
const getTeensNotInSeason = async (req, res, next) => {
    try {
        const seasonId = Number(req.params.id);
        const teens = await seasonServices.getTeensNotInSeason(seasonId);
        res.json({ data: teens });
    }
    catch (err) {
        next(err);
    }
};
const updateSeason = async (req, res, next) => {
    try {
        const seasonBody = { ...req.body };
        const seasonId = Number(req.params.id);
        const seasonUpdated = await seasonServices.updateSeason(seasonId, seasonBody);
        res.status(200).json({
            message: "Season updated",
            data: seasonUpdated,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteSeason = async (req, res, next) => {
    try {
        const seasonId = Number(req.params.id);
        const seasonDeleted = await seasonServices.deleteSeason(seasonId);
        if (!seasonDeleted) {
            res.status(404).json({ message: "Season not found" });
            return;
        }
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { createSeason, getSeasons, getSeason, getTeamsInSeason, getTeensNotInSeason, updateSeason, deleteSeason, };
//# sourceMappingURL=seasonController.js.map
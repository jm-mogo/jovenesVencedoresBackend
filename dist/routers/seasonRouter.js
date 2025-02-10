import { Router } from "express";
import { getSeasons, getSeason, createSeason, updateSeason, deleteSeason, getTeamsInSeason, getTeensNotInSeason, } from "../controllers/seasonController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { seasonSchema } from "../schemas/seasonsSchemas.js";
const seasonRouter = Router();
seasonRouter.use(passport.authenticate("jwt", { session: false }));
seasonRouter.post("/", validateAuthorization("admin"), validateData(seasonSchema), createSeason);
seasonRouter.get("/", getSeasons);
seasonRouter.get("/:id", getSeason);
seasonRouter.get("/:id/teams", getTeamsInSeason);
seasonRouter.get("/:id/teens", getTeensNotInSeason);
seasonRouter.put("/:id", validateAuthorization("admin"), validateData(seasonSchema), updateSeason);
seasonRouter.delete("/:id", validateAuthorization("admin"), deleteSeason);
export default seasonRouter;
//# sourceMappingURL=seasonRouter.js.map
import { Router } from "express";
import {
	getTeams,
	getTeam,
	createTeam,
	updateTeam,
	deleteTeam,
	getMembers,
} from "../controllers/teamController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import { teamCreateSchema, teamUpdateSchema } from "../schemas/teamSchemas.js";

const teamRouter = Router();

teamRouter.use(passport.authenticate("jwt", { session: false }));

teamRouter.post(
	"/",
	validateAuthorization("admin"),
	validateData(teamCreateSchema),
	createTeam
);

teamRouter.get("/", getTeams);

teamRouter.get("/:id", getTeam);

teamRouter.get("/:id/members", getMembers);

teamRouter.put(
	"/:id",
	validateAuthorization("admin"),
	validateData(teamUpdateSchema),
	updateTeam
);

teamRouter.delete("/:id", deleteTeam);

export default teamRouter;

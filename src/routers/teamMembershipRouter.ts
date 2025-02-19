import { Router } from "express";
import {
	createTeamMembership,
	deleteTeamMembership,
	updateTeamMembership,
} from "../controllers/teamMembershipController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import {
	teamMembershipSchema,
	teamMembershipSchemaUpdate,
} from "../schemas/teamMembershipSchemas.js";

const teamMembership = Router();

teamMembership.use(
	passport.authenticate("jwt", { session: false }),
	validateAuthorization("admin")
);

teamMembership.post(
	"/",
	validateData(teamMembershipSchema),
	createTeamMembership
);

teamMembership.put(
	"/:id",
	validateData(teamMembershipSchemaUpdate),
	updateTeamMembership
);

teamMembership.delete("/:id", deleteTeamMembership);

export default teamMembership;

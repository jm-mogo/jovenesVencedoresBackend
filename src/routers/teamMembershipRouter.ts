import { Router } from "express";
import {
	createTeamMembership,
	deleteTeamMembership,
} from "../controllers/teamMembershipController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import { teamMembershipSchema } from "../schemas/teamMembershipSchemas.js";

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

teamMembership.delete("/:id", deleteTeamMembership);

export default teamMembership;

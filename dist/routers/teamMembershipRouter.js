import { Router } from "express";
import { createTeamMembership, deleteTeamMembership, } from "../controllers/teamMembershipController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { teamMembershipSchema } from "../schemas/teamMembershipSchemas.js";
const teamMembership = Router();
teamMembership.use(passport.authenticate("jwt", { session: false }));
teamMembership.post("/", validateAuthorization("admin"), validateData(teamMembershipSchema), createTeamMembership);
teamMembership.delete("/:id", validateAuthorization("admin"), deleteTeamMembership);
export default teamMembership;
//# sourceMappingURL=teamMembershipRouter.js.map
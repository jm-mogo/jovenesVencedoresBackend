import { Router } from "express";
import {
	createGroup,
	getGroup,
	getGroups,
	updateGroup,
	deleteGroup,
} from "../controllers/groupController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import {
	groupCreateSchema,
	groupUpdateSchema,
} from "../schemas/groupSchemas.js";

const groupRouter = Router();

groupRouter.use(
	passport.authenticate("jwt", { session: false }),
	validateAuthorization("primaryOwner")
);

groupRouter.post("/", validateData(groupCreateSchema), createGroup);

groupRouter.get("/", getGroups);

groupRouter.get("/:id", getGroup);

groupRouter.put("/:id", validateData(groupUpdateSchema), updateGroup);

groupRouter.delete("/:id", deleteGroup);

export default groupRouter;

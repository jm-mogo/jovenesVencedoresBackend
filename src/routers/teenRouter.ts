import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
	createTeen,
	deleteTeen,
	getTeens,
	getTeen,
	updateTeen,
	getTeensWithBirthdaysThisMonth,
} from "../controllers/teenController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import { teenCreateSchema, teenUpdateSchema } from "../schemas/teenSchemas.js";

const teenRouter = Router();

teenRouter.use(passport.authenticate("jwt", { session: false }));

teenRouter.post(
	"/",
	validateAuthorization("admin"),
	validateData(teenCreateSchema),
	createTeen
);

teenRouter.get("/", getTeens);

teenRouter.get("/birthdaysThisMonth", getTeensWithBirthdaysThisMonth);

teenRouter.get("/:id", getTeen);

teenRouter.put(
	"/:id",
	validateAuthorization("admin"),
	validateData(teenUpdateSchema),
	updateTeen
);

teenRouter.delete("/:id", validateAuthorization("admin"), deleteTeen);

export default teenRouter;

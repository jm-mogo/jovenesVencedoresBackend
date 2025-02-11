import { Router } from "express";

import {
	createAttendance,
	deleteAttendance,
} from "../controllers/attendanceController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import { attendanceSchema } from "../schemas/attendanceSchemas.js";

const attendancesRouter = Router();

attendancesRouter.use(
	passport.authenticate("jwt", {
		session: false,
	}),
	validateAuthorization("admin")
);

attendancesRouter.post("/", validateData(attendanceSchema), createAttendance);

attendancesRouter.delete("/:id", deleteAttendance);

export default attendancesRouter;

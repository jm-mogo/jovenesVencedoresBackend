import { Router } from "express";
import {
	createMeeting,
	getMeeting,
	deleteMeeting,
	getPointsInMeeting,
	getTeensInMeeting,
	getTeensNotInMeeting,
	updateMeeting,
} from "../controllers/meetingController.js";
import passport from "passport";
import {
	validateAuthorization,
	validateData,
} from "../middlewares/validationMiddleware.js";
import {
	meetingCreateSchema,
	meetingUpdateSchema,
} from "../schemas/meetingSchemas.js";

const meetingRouter = Router();

meetingRouter.use(passport.authenticate("jwt", { session: false }));

meetingRouter.post(
	"/",
	validateAuthorization("admin"),
	validateData(meetingCreateSchema),
	createMeeting
);

meetingRouter.get("/:id", getMeeting);

meetingRouter.get("/:id/attendances", getTeensInMeeting);

meetingRouter.get("/:id/teens", getTeensNotInMeeting);

meetingRouter.get("/:id/points", getPointsInMeeting);

meetingRouter.put(
	"/:id",
	validateAuthorization("admin"),
	validateData(meetingUpdateSchema),
	updateMeeting
);

meetingRouter.delete("/:id", validateAuthorization("admin"), deleteMeeting);

export default meetingRouter;

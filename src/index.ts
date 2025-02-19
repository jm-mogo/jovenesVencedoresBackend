import express from "express";
import teenRouter from "./routers/teenRouter.js";
import parentRouter from "./routers/parentRouter.js";
import seasonRouter from "./routers/seasonRouter.js";
import teamRouter from "./routers/teamRouter.js";
import teamMembership from "./routers/teamMembershipRouter.js";
import meetingRouter from "./routers/meetingRouter.js";
import pointRecordRouter from "./routers/pointRecordRouter.js";
import cors from "cors";
import attendancesRouter from "./routers/attendanceRouter.js";
import passport from "./middlewares/passport.js";
import userRouter from "./routers/userRouter.js";
import groupRouter from "./routers/groupRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { validateAuthorization } from "./middlewares/validationMiddleware.js";
import myAccountRouter from "./routers/myAccountRouter.js";

const app = express();

const PORT: number = 8800;
const HOST: string = "0.0.0.0";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/teens", teenRouter);
app.use("/parents", parentRouter);
app.use("/seasons", seasonRouter);
app.use("/teams", teamRouter);
app.use("/teamMemberships", teamMembership);
app.use("/meetings", meetingRouter);
app.use("/attendances", attendancesRouter);
app.use("/points", pointRecordRouter);
app.use("/myaccount", myAccountRouter);

app.use(errorMiddleware);

app.listen(PORT, HOST, () => {
	console.log(`app running on ${HOST}:${PORT}`);
});

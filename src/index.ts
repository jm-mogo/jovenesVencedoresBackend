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
import myAccountRouter from "./routers/myAccountRouter.js";
import { PORT, HOST } from "./config/config.js";
import "dotenv/config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get("/", (req, res) => {
	res.json("working");
});

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

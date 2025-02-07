import express from "express";
import teenRouter from "./routers/teenRouter.js";
import parentRouter from "./routers/parentRouter.js";
import seasonRouter from "./routers/seasonRouter.js";
import teamRouter from "./routers/teamRouter.js";
import teamMembership from "./routers/teamMembershipRouter.js";
import meetingRouter from "./routers/meetingRouter.js";
import pointRecordRouter from "./routers/pointRecordRouter.js";
import cors from "cors";
import attendancesRouter from "./routers/attendaceRouter.js";
import passport from "./passport.js";
import userRouter from "./routers/userRouter.js";
import groupRouter from "./routers/groupRouter.js";
const app = express();
const PORT = 8800;
const HOST = "0.0.0.0";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use("/teens", teenRouter);
app.use("/parents", parentRouter);
app.use("/seasons", seasonRouter);
app.use("/teams", teamRouter);
app.use("/teamMemberships", teamMembership);
app.use("/meetings", meetingRouter);
app.use("/pointRecords", pointRecordRouter);
app.use("/attendances", attendancesRouter);
app.use("/points", pointRecordRouter);
app.use("/groups", passport.authenticate("jwt", { session: false }), groupRouter);
app.use("/users", userRouter);
app.get("/protected", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ user: req.user });
});
app.listen(PORT, HOST, () => {
    console.log(`app running on ${HOST}:${PORT}`);
});
//# sourceMappingURL=index.js.map
import express from "express";
import teenRouter from "./routers/teenRouter.js";
import parentRouter from "./routers/parentRouter.js";
import seasonRouter from "./routers/seasonRouter.js";
import teamRouter from "./routers/teamRouter.js";
import teamMembership from "./routers/teamMembershipRouter.js";
import meatingRouter from "./routers/meatingRouter.js";
const app = express();
const PORT = 8800;
const HOST = "0.0.0.0";
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/teens", teenRouter);
app.use("/parents", parentRouter);
app.use("/seasons", seasonRouter);
app.use("/teams", teamRouter);
app.use("/teamMemberships", teamMembership);
app.use("/meatings", meatingRouter);
app.listen(PORT, HOST, () => {
    console.log(`app running on ${HOST}:${PORT}`);
});
//# sourceMappingURL=index.js.map
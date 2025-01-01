import express, { urlencoded } from "express";
import teenRouter from "./routers/teenRouter.js";
import parentRouter from "./routers/parentRouter.js";

const app = express();

const PORT: number = 8800;
const HOST: string = "0.0.0.0";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/teens", teenRouter);
app.use("/parents", parentRouter);

app.listen(PORT, HOST, () => {
    console.log(`app running on ${HOST}:${PORT}`);
});

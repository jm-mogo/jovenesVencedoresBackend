import { Router } from "express";
import { updatePointRecord } from "../controllers/pointRecordController.js";
const pointRecordRouter = Router();
pointRecordRouter.put("/:id", updatePointRecord);
pointRecordRouter;
export default pointRecordRouter;
//# sourceMappingURL=pointRecordRouter.js.map
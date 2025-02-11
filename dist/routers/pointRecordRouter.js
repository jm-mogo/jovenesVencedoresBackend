import { Router } from "express";
import { updatePointRecord } from "../controllers/pointRecordController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { pointSchema } from "../schemas/pointRecordSchemas.js";
const pointRecordRouter = Router();
pointRecordRouter.use(passport.authenticate("jwt", { session: false }), validateAuthorization("admin"));
pointRecordRouter.put("/:id", validateData(pointSchema), updatePointRecord);
pointRecordRouter;
export default pointRecordRouter;
//# sourceMappingURL=pointRecordRouter.js.map
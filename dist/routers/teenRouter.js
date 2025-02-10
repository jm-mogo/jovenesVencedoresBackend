import { Router } from "express";
import { createTeen, deleteTeen, getTeens, getTeen, updateTeen, } from "../controllers/teenController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { teenCreateSchema, teenUpdateSchema } from "../schemas/teenSchemas.js";
const teenRouter = Router();
teenRouter.use(passport.authenticate("jwt", { session: false }));
teenRouter.post("/", validateAuthorization("admin"), validateData(teenCreateSchema), createTeen);
teenRouter.get("/", getTeens);
teenRouter.get("/:id", getTeen);
teenRouter.put("/:id", validateAuthorization("admin"), validateData(teenUpdateSchema), updateTeen);
teenRouter.delete("/:id", validateAuthorization("admin"), deleteTeen);
export default teenRouter;
//# sourceMappingURL=teenRouter.js.map
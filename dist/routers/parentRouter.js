import { Router } from "express";
import { createParent, deleteParent, getParents, getParent, updateParent, } from "../controllers/parentController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { parentCreateSchema, parentUpdateSchema, } from "../schemas/parentSchemas.js";
const parentRouter = Router();
parentRouter.use(passport.authenticate("jwt", { session: false }));
parentRouter.post("/", validateAuthorization("admin"), validateData(parentCreateSchema), createParent);
parentRouter.get("/", getParents);
parentRouter.get("/:id", getParent);
parentRouter.put("/:id", validateAuthorization("admin"), validateData(parentUpdateSchema), updateParent);
parentRouter.delete("/:id", validateAuthorization("admin"), deleteParent);
export default parentRouter;
//# sourceMappingURL=parentRouter.js.map
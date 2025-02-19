import { Router } from "express";
import { createGroup, getGroup, getGroups, updateGroup, deleteGroup, } from "../controllers/groupController.js";
import passport from "passport";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { groupCreateSchema, groupUpdateSchema, } from "../schemas/groupSchemas.js";
const groupRouter = Router();
groupRouter.use(passport.authenticate("jwt", { session: false }));
groupRouter.post("/", validateAuthorization("primaryOwner"), validateData(groupCreateSchema), createGroup);
groupRouter.get("/", validateAuthorization("primaryOwner"), getGroups);
groupRouter.get("/:id", validateAuthorization("owner"), getGroup);
groupRouter.put("/:id", validateAuthorization("primaryOwner"), validateData(groupUpdateSchema), updateGroup);
groupRouter.delete("/:id", validateAuthorization("primaryOwner"), deleteGroup);
export default groupRouter;
//# sourceMappingURL=groupRouter.js.map
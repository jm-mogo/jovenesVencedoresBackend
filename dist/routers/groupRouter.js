import { Router } from "express";
import { createGroup, getGroupById, getGroups, } from "../controllers/groupController.js";
const groupRouter = Router();
groupRouter.get("/", async (req, res) => {
    try {
        if (req.user?.role == "primaryOwner") {
            const groups = await getGroups();
            res.json(groups);
        }
        else {
            res.status(401).json("unauthorized");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
groupRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (req.user?.role == "primaryOwner") {
            const group = await getGroupById(id);
            res.json(group);
        }
        else {
            res.status(401).json("unauthorized");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
groupRouter.post("/", async (req, res) => {
    try {
        const { name, churchName } = req.body;
        if (req.user?.role == "primaryOwner") {
            const newGroup = await createGroup(name, churchName);
            res.status(201).json(newGroup);
        }
        else {
            res.status(401).json("unauthorized");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default groupRouter;
//# sourceMappingURL=groupRouter.js.map
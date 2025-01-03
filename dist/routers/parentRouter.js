import { Router } from "express";
import { createParent, deleteParentById, getAllParents, getParentById, updateParentById, } from "../controllers/parentController.js";
const parentRouter = Router();
parentRouter.get("/", async (req, res) => {
    const parents = await getAllParents();
    res.json({ parents });
});
parentRouter.get("/:id", async (req, res) => {
    const parentId = Number(req.params.id);
    const parent = await getParentById(parentId);
    res.json({ parent });
});
parentRouter.post("/", async (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;
    try {
        const newParent = await createParent(firstName, lastName, phoneNumber);
        res.status(201).json({
            message: "Parent created successfully",
            parent: newParent,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
parentRouter.delete("/:id", async (req, res) => {
    const parentId = Number(req.params.id);
    try {
        await deleteParentById(parentId);
        res.status(204).json({ message: "deleted succesfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
parentRouter.put("/:id", async (req, res) => {
    const parentId = Number(req.params.id);
    try {
        const parentUpdated = await updateParentById(req.body, parentId);
        res.status(200).json({
            message: "updated successfully",
            parent: parentUpdated,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});
export default parentRouter;
//# sourceMappingURL=parentRouter.js.map
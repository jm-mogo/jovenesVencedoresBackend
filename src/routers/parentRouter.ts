import { Router } from "express";
import {
    getAllParents,
    getParentById,
} from "../controllers/parentController.js";

const parentRouter = Router();

parentRouter.get("/", async (req, res) => {
    const parents = await getAllParents();
    res.json({ parents });
});

parentRouter.get("/:id", async (req, res) => {
    const parentId: number = Number(req.params.id);
    const parent = await getParentById(parentId);
    res.json({ parent });
});

export default parentRouter;

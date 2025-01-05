import { Router } from "express";
import {
    createPointRecord,
    deletePointRecordById,
} from "../controllers/pointRecordController.js";
const pointRecordRouter = Router();

pointRecordRouter.post("/", async (req, res) => {
    try {
        const newPointRecord = await createPointRecord(req.body);
        res.status(201).json({
            message: "created successfully",
            pointRecord: newPointRecord,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

pointRecordRouter.delete("/:id", async (req, res) => {
    const pointRecordId: number = Number(req.params.id);
    try {
        await deletePointRecordById(pointRecordId);
        res.status(204).json({ message: "Point record deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

pointRecordRouter;

export default pointRecordRouter;

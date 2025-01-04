import { Router } from "express";
import {
    createMeating,
    deleteMeatingById,
} from "../controllers/meetingController.js";

const meetingRouter = Router();

meetingRouter.post("/", async (req, res) => {
    req.body.date = new Date(req.body.date);
    try {
        const newMeeting = await createMeating(req.body);
        res.status(201).json({
            message: "Meating created successfully",
            newMeeting,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

meetingRouter.delete("/:id", async (req, res) => {
    try {
        const meatingId = Number(req.params.id);
        await deleteMeatingById(meatingId);

        res.json({ message: "Meating deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default meetingRouter;

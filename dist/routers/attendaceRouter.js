import { Router } from "express";
import { deleteTeamMembershipById, } from "../controllers/teamMembershipController.js";
import { createAttendance } from "../controllers/attendaceController.js";
const attendancesRouter = Router();
attendancesRouter.post("/", async (req, res) => {
    try {
        const newAttendance = await createAttendance(req.body);
        res.status(201).json({
            message: "Attendance created successfully",
            attendance: newAttendance,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
attendancesRouter.delete("/:id", async (req, res) => {
    try {
        const teamMembershipId = Number(req.params.id);
        await deleteTeamMembershipById(teamMembershipId);
        res.json({ message: "Team membership deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default attendancesRouter;
//# sourceMappingURL=attendaceRouter.js.map
import { attendanceServices } from "../services/attendanceServices.js";
const createAttendance = async (req, res, next) => {
    try {
        const attendanceBody = { ...req.body };
        const attendance = await attendanceServices.createAttendance(attendanceBody);
        res.status(201).json({
            message: "Attendance created",
            data: attendance,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteAttendance = async (req, res, next) => {
    try {
        const attendanceId = Number(req.params.id);
        await attendanceServices.deleteAttendance(attendanceId);
        res.status(204).json({ message: "Attendance deleted" });
    }
    catch (err) {
        next(err);
    }
};
export { createAttendance, deleteAttendance };
//# sourceMappingURL=attendanceController.js.map
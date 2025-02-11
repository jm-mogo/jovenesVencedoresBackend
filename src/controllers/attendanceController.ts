import { Request, Response, NextFunction } from "express";
import { attendanceServices } from "../services/attendanceServices.js";

const createAttendance = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const attendanceBody = { ...req.body };

		const attendance = await attendanceServices.createAttendance(
			attendanceBody
		);
		res.status(201).json({
			message: "Attendance created",
			data: attendance,
		});
	} catch (err) {
		next(err);
	}
};

const deleteAttendance = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const attendanceId = Number(req.params.id);
		await attendanceServices.deleteAttendance(attendanceId);
		res.status(204).json({ message: "Attendance deleted" });
	} catch (err) {
		next(err);
	}
};

export { createAttendance, deleteAttendance };

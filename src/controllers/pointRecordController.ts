import { Request, Response, NextFunction } from "express";
import { pointRecordServices } from "../services/pointRecordServices.js";

const updatePointRecord = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const pointRecordId: number = Number(req.params.id);
		const pointRecordBody = { ...req.body };

		const pointRecordUpdated = await pointRecordServices.updatePointRecord(
			pointRecordId,
			pointRecordBody
		);

		res.status(201).json({
			message: "updated successfully",
			data: pointRecordUpdated,
		});
	} catch (err) {
		next(err);
	}
};

export { updatePointRecord };

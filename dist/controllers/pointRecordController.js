import { pointRecordServices } from "../services/pointRecordServices.js";
const updatePointRecord = async (req, res, next) => {
    try {
        const pointRecordId = Number(req.params.id);
        const pointRecordBody = { ...req.body };
        const pointRecordUpdated = await pointRecordServices.updatePointRecord(pointRecordId, pointRecordBody);
        res.status(201).json({
            message: "updated successfully",
            data: pointRecordUpdated,
        });
    }
    catch (err) {
        next(err);
    }
};
export { updatePointRecord };
//# sourceMappingURL=pointRecordController.js.map
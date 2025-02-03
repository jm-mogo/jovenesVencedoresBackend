import { Router } from "express";
import { updatePointRecord, } from "../controllers/pointRecordController.js";
const pointRecordRouter = Router();
pointRecordRouter.put("/:id", async (req, res) => {
    const pointRecordId = Number(req.params.id);
    try {
        const pointRecordUpdated = await updatePointRecord(pointRecordId, req.body);
        res.status(200).json({
            message: "updated successfully",
            pointRecord: pointRecordUpdated,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
pointRecordRouter;
export default pointRecordRouter;
//# sourceMappingURL=pointRecordRouter.js.map
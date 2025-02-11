import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const updatePointRecord = async (pointRecordId, pointRecordBody) => {
    const pointRecordUpdated = await prisma.pointRecord.update({
        where: {
            id: pointRecordId,
        },
        data: pointRecordBody,
    });
    return pointRecordUpdated;
};
export const pointRecordServices = {
    updatePointRecord,
};
//# sourceMappingURL=pointRecordServices.js.map
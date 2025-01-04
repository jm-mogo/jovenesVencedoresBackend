/*
  Warnings:

  - You are about to drop the column `teamMembershipId` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_teamMembershipId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "teamMembershipId",
ADD COLUMN     "teamMembershipIds" INTEGER[];

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_teamMembershipIds_fkey" FOREIGN KEY ("teamMembershipIds") REFERENCES "TeamMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

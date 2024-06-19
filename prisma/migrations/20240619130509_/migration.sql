/*
  Warnings:

  - A unique constraint covering the columns `[joiningCode]` on the table `Household` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Household" ADD COLUMN     "joiningCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Household_joiningCode_key" ON "Household"("joiningCode");

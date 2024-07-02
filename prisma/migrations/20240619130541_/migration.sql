/*
  Warnings:

  - Made the column `joiningCode` on table `Household` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Household" ALTER COLUMN "joiningCode" SET NOT NULL;

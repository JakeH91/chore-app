/*
  Warnings:

  - Made the column `name` on table `Household` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Household" ALTER COLUMN "name" SET NOT NULL;

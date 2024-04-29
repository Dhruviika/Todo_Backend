/*
  Warnings:

  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "completed" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastName";

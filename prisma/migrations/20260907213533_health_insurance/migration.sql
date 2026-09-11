/*
  Warnings:

  - You are about to drop the column `healthInsurance` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "healthInsurance",
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT;

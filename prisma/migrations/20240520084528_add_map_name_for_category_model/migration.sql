/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "UsageStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "UsageStatus" AS ENUM ('ACTIVE', 'HIDDEN');

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "UsageStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

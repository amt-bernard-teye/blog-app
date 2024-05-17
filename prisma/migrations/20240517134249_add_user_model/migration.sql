-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'READER', 'BLOGGER');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'SUSPENDED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

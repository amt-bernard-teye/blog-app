-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "UsageStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

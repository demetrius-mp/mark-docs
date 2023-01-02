/*
  Warnings:

  - You are about to drop the column `createdAt` on the `docs` table. All the data in the column will be lost.
  - You are about to drop the column `sharePrivileges` on the `docs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `docs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `docs` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `docs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "docs" DROP COLUMN "createdAt",
DROP COLUMN "sharePrivileges",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "share_privileges" "SharedDocPrivileges" NOT NULL DEFAULT 'VIEWER',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "docs_uuid_key" ON "docs"("uuid");

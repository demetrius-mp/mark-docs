/*
  Warnings:

  - The `sharePrivileges` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visibility` column on the `docs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocVisibility" AS ENUM ('PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "SharedDocPrivileges" AS ENUM ('EDITOR', 'VIEWER');

-- AlterTable
ALTER TABLE "docs" DROP COLUMN "sharePrivileges",
ADD COLUMN     "sharePrivileges" "SharedDocPrivileges" NOT NULL DEFAULT 'VIEWER',
DROP COLUMN "visibility",
ADD COLUMN     "visibility" "DocVisibility" NOT NULL DEFAULT 'PRIVATE';

-- DropEnum
DROP TYPE "SharePrivileges";

-- DropEnum
DROP TYPE "Visibility";

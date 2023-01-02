-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PRIVATE', 'PUBLIC', 'ONLY_WITH_LINK');

-- CreateEnum
CREATE TYPE "SharePrivileges" AS ENUM ('EDITOR', 'VIEWER');

-- AlterTable
ALTER TABLE "docs" ADD COLUMN     "sharePrivileges" "SharePrivileges" NOT NULL DEFAULT 'VIEWER',
ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE';

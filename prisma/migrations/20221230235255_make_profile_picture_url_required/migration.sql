/*
  Warnings:

  - Made the column `profile_picture_url` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_picture_url" SET NOT NULL;

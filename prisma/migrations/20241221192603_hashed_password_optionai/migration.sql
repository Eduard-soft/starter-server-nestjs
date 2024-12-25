/*
  Warnings:

  - You are about to drop the column `picture` on the `posts` table. All the data in the column will be lost.
  - Added the required column `picture_url` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar_url` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "picture",
ADD COLUMN     "picture_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar_url" SET NOT NULL;

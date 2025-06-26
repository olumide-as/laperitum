/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `publications` will be added. If there are existing duplicate values, this will fail.
  - Made the column `slug` on table `publications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `publications` MODIFY `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `publications_slug_key` ON `publications`(`slug`);

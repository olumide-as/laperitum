/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `publications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE publications ADD COLUMN slug VARCHAR(255);
-- note: no NOT NULL constraint yet
-- CreateIndex

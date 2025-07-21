/*
  Warnings:

  - You are about to drop the column `department_id` on the `majors` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `department_id` ON `majors`;

-- AlterTable
ALTER TABLE `majors` DROP COLUMN `department_id`;

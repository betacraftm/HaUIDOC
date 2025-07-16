/*
  Warnings:

  - You are about to drop the column `department_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `department_id` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `department_id`,
    MODIFY `role` VARCHAR(50) NULL DEFAULT 'client';

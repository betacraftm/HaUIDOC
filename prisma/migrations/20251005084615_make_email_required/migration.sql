/*
  Warnings:

  - Made the column `password_hash` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `major_id` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `users` MODIFY `password_hash` VARCHAR(255) NOT NULL,
    MODIFY `role` ENUM('client', 'admin') NOT NULL DEFAULT 'client',
    MODIFY `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `major_id` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

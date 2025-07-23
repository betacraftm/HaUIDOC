/*
  Warnings:

  - The primary key for the `majors` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `subjects` DROP FOREIGN KEY `subjects_ibfk_1`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;

-- AlterTable
ALTER TABLE `majors` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `subjects` MODIFY `major_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `major_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

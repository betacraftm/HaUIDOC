/*
  Warnings:

  - You are about to drop the column `rating` on the `comments` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.
  - You are about to drop the `oauth_accounts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `documents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `majors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `subjects` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `oauth_accounts` DROP FOREIGN KEY `oauth_accounts_ibfk_1`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `rating`;

-- AlterTable
ALTER TABLE `documents` MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `majors` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `subjects` MODIFY `name` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(255) NOT NULL,
    MODIFY `role` ENUM('client', 'admin') NULL DEFAULT 'client',
    MODIFY `username` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `oauth_accounts`;

-- CreateIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);

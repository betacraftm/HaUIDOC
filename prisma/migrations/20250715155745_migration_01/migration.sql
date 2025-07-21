/*
  Warnings:

  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `majors` DROP FOREIGN KEY `majors_ibfk_1`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_2`;

-- DropTable
DROP TABLE `departments`;

/*
  Warnings:

  - You are about to drop the `PasswordResetToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserLikedDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserViewedDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PasswordResetToken` DROP FOREIGN KEY `PasswordResetToken_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLikedDocument` DROP FOREIGN KEY `UserLikedDocument_document_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserLikedDocument` DROP FOREIGN KEY `UserLikedDocument_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserViewedDocument` DROP FOREIGN KEY `UserViewedDocument_document_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserViewedDocument` DROP FOREIGN KEY `UserViewedDocument_user_id_fkey`;

-- AlterTable
ALTER TABLE `documents` ADD COLUMN `download_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `view_count` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_banned` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `PasswordResetToken`;

-- DropTable
DROP TABLE `UserLikedDocument`;

-- DropTable
DROP TABLE `UserViewedDocument`;

-- CreateTable
CREATE TABLE `user_liked_documents` (
    `user_id` VARCHAR(191) NOT NULL,
    `document_id` VARCHAR(191) NOT NULL,

    INDEX `UserLikedDocument_document_id_idx`(`document_id`),
    INDEX `UserLikedDocument_user_id_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_viewed_documents` (
    `user_id` VARCHAR(191) NOT NULL,
    `document_id` VARCHAR(191) NOT NULL,
    `viewed_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `UserViewedDocument_document_id_idx`(`document_id`),
    INDEX `UserViewedDocument_user_id_idx`(`user_id`),
    PRIMARY KEY (`user_id`, `document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    INDEX `PasswordResetToken_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_liked_documents` ADD CONSTRAINT `UserLikedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_liked_documents` ADD CONSTRAINT `UserLikedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_viewed_documents` ADD CONSTRAINT `UserViewedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_viewed_documents` ADD CONSTRAINT `UserViewedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `UserLikedDocument` (
    `user_id` VARCHAR(191) NOT NULL,
    `document_id` VARCHAR(191) NOT NULL,
    `liked_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `UserLikedDocument_user_id_idx`(`user_id`),
    INDEX `UserLikedDocument_document_id_idx`(`document_id`),
    PRIMARY KEY (`user_id`, `document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserViewedDocument` (
    `user_id` VARCHAR(191) NOT NULL,
    `document_id` VARCHAR(191) NOT NULL,
    `viewed_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `UserViewedDocument_user_id_idx`(`user_id`),
    INDEX `UserViewedDocument_document_id_idx`(`document_id`),
    PRIMARY KEY (`user_id`, `document_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserLikedDocument` ADD CONSTRAINT `UserLikedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDocument` ADD CONSTRAINT `UserLikedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserViewedDocument` ADD CONSTRAINT `UserViewedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserViewedDocument` ADD CONSTRAINT `UserViewedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

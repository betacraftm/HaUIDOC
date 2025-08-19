-- CreateTable
CREATE TABLE `comments` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `document_id` VARCHAR(191) NULL,
    `content` TEXT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `document_id`(`document_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documents` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desc` TEXT NULL,
    `file_url` VARCHAR(255) NULL,
    `subject_id` VARCHAR(191) NULL,
    `uploaded_by` VARCHAR(191) NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `subject_id`(`subject_id`),
    INDEX `uploaded_by`(`uploaded_by`),
    INDEX `documents_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `majors` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `majors_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `major_id` VARCHAR(191) NULL,

    INDEX `subjects_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NULL,
    `role` ENUM('client', 'admin') NULL DEFAULT 'client',
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `image_url` VARCHAR(255) NULL,
    `major_id` VARCHAR(191) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    INDEX `major_id`(`major_id`),
    INDEX `users_username_idx`(`username`),
    INDEX `users_role_idx`(`role`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documents` ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `majors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserLikedDocument` ADD CONSTRAINT `UserLikedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLikedDocument` ADD CONSTRAINT `UserLikedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserViewedDocument` ADD CONSTRAINT `UserViewedDocument_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserViewedDocument` ADD CONSTRAINT `UserViewedDocument_document_id_fkey` FOREIGN KEY (`document_id`) REFERENCES `documents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

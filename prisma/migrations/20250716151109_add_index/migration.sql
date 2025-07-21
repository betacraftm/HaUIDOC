-- CreateIndex
CREATE INDEX `documents_title_idx` ON `documents`(`title`);

-- CreateIndex
CREATE INDEX `majors_name_idx` ON `majors`(`name`);

-- CreateIndex
CREATE INDEX `subjects_name_idx` ON `subjects`(`name`);

-- CreateIndex
CREATE INDEX `users_username_idx` ON `users`(`username`);

-- CreateIndex
CREATE INDEX `users_role_idx` ON `users`(`role`);

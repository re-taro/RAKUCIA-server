-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `recipe_title` VARCHAR(255) NOT NULL,
    `recipe_url` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `recipe_material` VARCHAR(255) NOT NULL,
    `recipe_indication` VARCHAR(5) NOT NULL,
    `recipe_cost` VARCHAR(9) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `leave_flag` INTEGER NULL,
    `add_to_list` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `rss_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleZh` varchar(512) NOT NULL,
	`titleEn` varchar(512),
	`description` text,
	`url` varchar(512) NOT NULL,
	`imageUrl` varchar(512),
	`source` varchar(128) NOT NULL DEFAULT 'aihot',
	`publishedAt` timestamp,
	`translated` boolean NOT NULL DEFAULT false,
	`visible` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rss_items_id` PRIMARY KEY(`id`),
	CONSTRAINT `rss_items_url_unique` UNIQUE(`url`)
);

CREATE TABLE `content_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(64) NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`url` varchar(512),
	`coverUrl` varchar(512),
	`publishedAt` timestamp,
	`visible` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nav_nodes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(64) NOT NULL,
	`url` varchar(512) NOT NULL,
	`icon` varchar(16),
	`sortOrder` int NOT NULL DEFAULT 0,
	`visible` boolean NOT NULL DEFAULT true,
	`posX` text,
	`posY` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nav_nodes_id` PRIMARY KEY(`id`)
);

CREATE TABLE `content_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`url` text,
	`coverUrl` text,
	`publishedAt` integer,
	`visible` integer DEFAULT true NOT NULL,
	`sortOrder` integer DEFAULT 0 NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `nav_nodes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`url` text NOT NULL,
	`icon` text,
	`sortOrder` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`posX` text,
	`posY` text,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rss_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titleZh` text NOT NULL,
	`titleEn` text,
	`description` text,
	`url` text NOT NULL,
	`imageUrl` text,
	`source` text DEFAULT 'aihot' NOT NULL,
	`publishedAt` integer,
	`translated` integer DEFAULT false NOT NULL,
	`visible` integer DEFAULT true NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rss_items_url_unique` ON `rss_items` (`url`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`openId` text NOT NULL,
	`name` text,
	`email` text,
	`loginMethod` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`lastSignedIn` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_open_id_unique` ON `users` (`openId`);
--> statement-breakpoint
INSERT OR IGNORE INTO `nav_nodes` (`label`, `url`, `sortOrder`, `visible`) VALUES
  ('Github', 'https://github.com/massif-01', 10, 1),
  ('Podcast', '/podcast', 20, 1),
  ('AI', '/ai', 30, 1),
  ('Info', '/info', 40, 1),
  ('AuraCAP', 'https://github.com/massif-01/AuraCap', 50, 1);

import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const timestamp = (name: string) =>
  integer(name, { mode: "timestamp" }).notNull().defaultNow();

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  openId: text("openId").notNull(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  role: text("role", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
  lastSignedIn: timestamp("lastSignedIn"),
}, table => ({
  openIdUnique: uniqueIndex("users_open_id_unique").on(table.openId),
}));

export const navNodes = sqliteTable("nav_nodes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  sortOrder: integer("sortOrder").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  posX: text("posX"),
  posY: text("posY"),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const contentItems = sqliteTable("content_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  coverUrl: text("coverUrl"),
  publishedAt: integer("publishedAt", { mode: "timestamp" }),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const rssItems = sqliteTable("rss_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  titleZh: text("titleZh").notNull(),
  titleEn: text("titleEn"),
  description: text("description"),
  url: text("url").notNull(),
  imageUrl: text("imageUrl"),
  source: text("source").notNull().default("aihot"),
  publishedAt: integer("publishedAt", { mode: "timestamp" }),
  translated: integer("translated", { mode: "boolean" }).notNull().default(false),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
}, table => ({
  urlUnique: uniqueIndex("rss_items_url_unique").on(table.url),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type NavNode = typeof navNodes.$inferSelect;
export type InsertNavNode = typeof navNodes.$inferInsert;
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = typeof contentItems.$inferInsert;
export type RssItem = typeof rssItems.$inferSelect;
export type InsertRssItem = typeof rssItems.$inferInsert;

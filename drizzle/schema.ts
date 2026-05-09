import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Nav Nodes ─────────────────────────────────────────────────────────────────
export const navNodes = mysqlTable("nav_nodes", {
  id: int("id").autoincrement().primaryKey(),
  label: varchar("label", { length: 64 }).notNull(),
  url: varchar("url", { length: 512 }).notNull(),
  icon: varchar("icon", { length: 16 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  visible: boolean("visible").default(true).notNull(),
  posX: text("posX"),
  posY: text("posY"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NavNode = typeof navNodes.$inferSelect;
export type InsertNavNode = typeof navNodes.$inferInsert;

// ── Content Items ─────────────────────────────────────────────────────────────
export const contentItems = mysqlTable("content_items", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 64 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  url: varchar("url", { length: 512 }),
  coverUrl: varchar("coverUrl", { length: 512 }),
  publishedAt: timestamp("publishedAt"),
  visible: boolean("visible").default(true).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = typeof contentItems.$inferInsert;

// ── RSS Items ─────────────────────────────────────────────────────────────────
export const rssItems = mysqlTable("rss_items", {
  id: int("id").autoincrement().primaryKey(),
  /** Original Chinese title */
  titleZh: varchar("titleZh", { length: 512 }).notNull(),
  /** English translated title */
  titleEn: varchar("titleEn", { length: 512 }),
  /** Article description/summary */
  description: text("description"),
  /** Article URL */
  url: varchar("url", { length: 512 }).notNull().unique(),
  /** Thumbnail/cover image */
  imageUrl: varchar("imageUrl", { length: 512 }),
  /** RSS source name */
  source: varchar("source", { length: 128 }).default("aihot").notNull(),
  /** Original publish time */
  publishedAt: timestamp("publishedAt"),
  /** Whether translated */
  translated: boolean("translated").default(false).notNull(),
  /** Whether visible */
  visible: boolean("visible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type RssItem = typeof rssItems.$inferSelect;
export type InsertRssItem = typeof rssItems.$inferInsert;
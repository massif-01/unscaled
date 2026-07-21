import { and, asc, desc, eq } from "drizzle-orm";
import {
  contentItems,
  navNodes,
  rssItems,
  users,
  type InsertContentItem,
  type InsertNavNode,
  type InsertRssItem,
  type InsertUser,
} from "../db/schema";
import { getDb } from "../db";

export async function getUserByOpenId(openId: string) {
  const db = getDb();
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function upsertUser(user: InsertUser) {
  const db = getDb();
  await db
    .insert(users)
    .values(user)
    .onConflictDoUpdate({
      target: users.openId,
      set: {
        name: user.name,
        email: user.email,
        loginMethod: user.loginMethod,
        role: user.role,
        lastSignedIn: user.lastSignedIn,
        updatedAt: new Date(),
      },
    });
  return getUserByOpenId(user.openId);
}

export async function getVisibleNavNodes() {
  return getDb()
    .select()
    .from(navNodes)
    .where(eq(navNodes.visible, true))
    .orderBy(asc(navNodes.sortOrder));
}

export async function getAllNavNodes() {
  return getDb().select().from(navNodes).orderBy(asc(navNodes.sortOrder), asc(navNodes.id));
}

export async function createNavNode(data: InsertNavNode) {
  await getDb().insert(navNodes).values(data);
}

export async function updateNavNode(id: number, data: Partial<InsertNavNode>) {
  await getDb().update(navNodes).set({ ...data, updatedAt: new Date() }).where(eq(navNodes.id, id));
}

export async function deleteNavNode(id: number) {
  await getDb().delete(navNodes).where(eq(navNodes.id, id));
}

export async function getVisibleContentItems(category?: string) {
  const conditions = [eq(contentItems.visible, true)];
  if (category) conditions.push(eq(contentItems.category, category));
  return getDb()
    .select()
    .from(contentItems)
    .where(and(...conditions))
    .orderBy(desc(contentItems.publishedAt), asc(contentItems.sortOrder));
}

export async function getAllContentItems(category?: string) {
  return getDb()
    .select()
    .from(contentItems)
    .where(category ? eq(contentItems.category, category) : undefined)
    .orderBy(asc(contentItems.sortOrder), desc(contentItems.publishedAt));
}

export async function createContentItem(data: InsertContentItem) {
  await getDb().insert(contentItems).values(data);
}

export async function updateContentItem(id: number, data: Partial<InsertContentItem>) {
  await getDb().update(contentItems).set({ ...data, updatedAt: new Date() }).where(eq(contentItems.id, id));
}

export async function deleteContentItem(id: number) {
  await getDb().delete(contentItems).where(eq(contentItems.id, id));
}

export async function getVisibleRssItems(limit: number, offset: number) {
  return getDb()
    .select()
    .from(rssItems)
    .where(eq(rssItems.visible, true))
    .orderBy(desc(rssItems.publishedAt), desc(rssItems.id))
    .limit(limit)
    .offset(offset);
}

export async function getRssItemByUrl(url: string) {
  const result = await getDb().select().from(rssItems).where(eq(rssItems.url, url)).limit(1);
  return result[0];
}

export async function createRssItem(data: InsertRssItem) {
  await getDb().insert(rssItems).values(data).onConflictDoNothing({ target: rssItems.url });
}

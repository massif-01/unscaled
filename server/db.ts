import { and, asc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  ContentItem,
  InsertContentItem,
  InsertNavNode,
  InsertUser,
  NavNode,
  contentItems,
  navNodes,
  users,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── Nav Nodes ─────────────────────────────────────────────────────────────────

export async function getVisibleNavNodes(): Promise<NavNode[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(navNodes).where(eq(navNodes.visible, true)).orderBy(asc(navNodes.sortOrder));
}

export async function getAllNavNodes(): Promise<NavNode[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(navNodes).orderBy(asc(navNodes.sortOrder));
}

export async function createNavNode(data: InsertNavNode): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(navNodes).values(data);
}

export async function updateNavNode(id: number, data: Partial<InsertNavNode>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(navNodes).set(data).where(eq(navNodes.id, id));
}

export async function deleteNavNode(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.delete(navNodes).where(eq(navNodes.id, id));
}

// ── Content Items ─────────────────────────────────────────────────────────────

export async function getVisibleContentItems(category?: string): Promise<ContentItem[]> {
  const db = await getDb();
  if (!db) return [];
  const conditions = [eq(contentItems.visible, true)];
  if (category) conditions.push(eq(contentItems.category, category));
  return db.select().from(contentItems).where(and(...conditions)).orderBy(asc(contentItems.sortOrder));
}

export async function getAllContentItems(category?: string): Promise<ContentItem[]> {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(contentItems).where(eq(contentItems.category, category)).orderBy(asc(contentItems.sortOrder));
  }
  return db.select().from(contentItems).orderBy(asc(contentItems.sortOrder));
}

export async function createContentItem(data: InsertContentItem): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.insert(contentItems).values(data);
}

export async function updateContentItem(id: number, data: Partial<InsertContentItem>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.update(contentItems).set(data).where(eq(contentItems.id, id));
}

export async function deleteContentItem(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  await db.delete(contentItems).where(eq(contentItems.id, id));
}

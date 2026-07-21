// @ts-expect-error The module is supplied by the Cloudflare Worker runtime.
import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error("D1 binding DB is not configured");
  }

  return drizzle(env.DB, { schema });
}

export type AppDb = ReturnType<typeof getDb>;

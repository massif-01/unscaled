// @ts-expect-error The module is supplied by the Cloudflare Worker runtime.
import { env } from "cloudflare:workers";

export type SiteEnv = {
  DB: D1Database;
  ADMIN_EMAIL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_MODEL?: string;
  RSS_SYNC_SECRET?: string;
  RSS_FEED_URL?: string;
};

export function getEnv(): SiteEnv {
  return env as unknown as SiteEnv;
}

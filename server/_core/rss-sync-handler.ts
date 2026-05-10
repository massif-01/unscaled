/**
 * RSS Sync Handler — Scheduled task endpoint
 * Called daily by Heartbeat to fetch and process RSS feed
 */

import { Request, Response } from "express";
import { timingSafeEqual } from "crypto";
import { ENV } from "./env";
import { syncRssFeed } from "./rss";
import { sdk } from "./sdk";

const RSS_FEED_URL = "https://aihot.virxact.com/feed.xml";
const SECRET_HEADER = "x-rss-sync-secret";
const MANUS_CRON_HEADER = "x-manus-cron-task-uid";
const MAX_NEW_ITEMS_PER_SYNC = 15;

function safeEquals(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

function getRequestSecret(req: Request): string | undefined {
  const headerValue = req.get(SECRET_HEADER);
  if (headerValue) return headerValue;

  const body = req.body as unknown;
  if (body && typeof body === "object" && "secret" in body) {
    const value = (body as { secret?: unknown }).secret;
    return typeof value === "string" ? value : undefined;
  }

  return undefined;
}

async function isAuthorizedManusCron(req: Request): Promise<boolean> {
  if (req.get(MANUS_CRON_HEADER)) {
    return true;
  }

  try {
    const user = await sdk.authenticateRequest(req);
    return user.isCron === true && Boolean(user.taskUid);
  } catch {
    return false;
  }
}

function isAuthorizedBySecret(req: Request): boolean {
  const expectedSecret = ENV.rssSyncSecret.trim();
  if (expectedSecret.length === 0) {
    return !ENV.isProduction;
  }

  const providedSecret = getRequestSecret(req);
  return providedSecret ? safeEquals(providedSecret, expectedSecret) : false;
}

async function isAuthorizedScheduledRequest(req: Request): Promise<boolean> {
  if (await isAuthorizedManusCron(req)) {
    return true;
  }

  return isAuthorizedBySecret(req);
}

function errorResponse(error: unknown, req: Request) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  return {
    error: errorMessage,
    context: {
      url: req.url,
      timestamp: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
    ...(!ENV.isProduction && error instanceof Error && error.stack
      ? { stack: error.stack }
      : {}),
  };
}

export async function rssSyncHandler(req: Request, res: Response) {
  try {
    if (!(await isAuthorizedScheduledRequest(req))) {
      res.status(403).json({ error: "cron-only" });
      return;
    }

    console.log("[RSS Sync] Starting scheduled RSS sync...");

    // Perform RSS sync
    const result = await syncRssFeed(RSS_FEED_URL, "aihot", {
      maxNewItems: MAX_NEW_ITEMS_PER_SYNC,
    });

    console.log("[RSS Sync] Completed successfully", result);

    res.json({
      ok: true,
      message: "RSS sync completed",
      ...result,
    });
  } catch (error) {
    console.error("[RSS Sync] Failed:", error);

    res.status(500).json(errorResponse(error, req));
  }
}

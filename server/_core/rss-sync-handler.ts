/**
 * RSS Sync Handler — Scheduled task endpoint
 * Called daily by Heartbeat to fetch and process RSS feed
 */

import { Request, Response } from "express";
import { timingSafeEqual } from "crypto";
import { ENV } from "./env";
import { syncRssFeed } from "./rss";

const RSS_FEED_URL = "https://aihot.virxact.com/feed.xml";
const SECRET_HEADER = "x-rss-sync-secret";
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

function isAuthorizedScheduledRequest(req: Request): boolean {
  const expectedSecret = ENV.rssSyncSecret.trim();
  if (expectedSecret.length > 0) {
    const providedSecret = getRequestSecret(req);
    return providedSecret ? safeEquals(providedSecret, expectedSecret) : false;
  }

  if (!ENV.isProduction) return true;

  // Legacy Manus Heartbeat projects can rely on the platform gateway to
  // restrict /api/scheduled/* and forward the cron task uid.
  return Boolean(req.get("x-manus-cron-task-uid"));
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
    if (!isAuthorizedScheduledRequest(req)) {
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

/**
 * RSS Sync Handler — Scheduled task endpoint
 * Called daily by Heartbeat to fetch and process RSS feed
 */

import { Request, Response } from "express";
import { syncRssFeed } from "./rss";

const RSS_FEED_URL = "https://aihot.virxact.com/feed/daily.xml";

export async function rssSyncHandler(req: Request, res: Response) {
  try {
    console.log("[RSS Sync] Starting scheduled RSS sync...");

    // Perform RSS sync
    const result = await syncRssFeed(RSS_FEED_URL, "aihot");

    console.log("[RSS Sync] Completed successfully", result);

    res.json({
      ok: true,
      message: "RSS sync completed",
      ...result,
    });
  } catch (error) {
    console.error("[RSS Sync] Failed:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    res.status(500).json({
      error: errorMessage,
      stack: errorStack,
      context: {
        url: req.url,
        timestamp: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }
}

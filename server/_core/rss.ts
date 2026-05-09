/**
 * RSS Fetcher & Translator
 * Handles fetching RSS feed, parsing items, and translating titles to English
 */

import { parseStringPromise } from "xml2js";
import { invokeLLM } from "./llm";
import { createRssItem, getRssItemByUrl } from "../db";
import type { InsertRssItem } from "../../drizzle/schema";

type RssEnclosure = {
  url: string;
  type?: string;
};

export interface RssFeedItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  enclosure?: RssEnclosure[];
}

type RssChannel = {
  item?: unknown | unknown[];
};

interface ParsedRssFeed {
  rss?: {
    channel?: RssChannel | RssChannel[];
  };
}

export type SyncRssFeedOptions = {
  delayMs?: number;
  maxNewItems?: number;
};

type ProcessRssItemResult = "stored" | "existing" | "failed";

const RSS_FEED_URL = "https://aihot.virxact.com/feed.xml";
const DEFAULT_LLM_DELAY_MS = 500;

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function textValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return textValue(value[0]);
  }

  if (value && typeof value === "object" && "_" in value) {
    return textValue((value as { _: unknown })._);
  }

  return undefined;
}

function normalizeEnclosures(value: unknown): RssEnclosure[] {
  return asArray(value)
    .map(entry => {
      const attrs =
        entry && typeof entry === "object" && "$" in entry
          ? (entry as { $?: Record<string, unknown> }).$
          : undefined;
      const url = textValue(attrs?.url);
      if (!url) return null;
      const enclosure: RssEnclosure = { url };
      const type = textValue(attrs?.type);
      if (type) enclosure.type = type;
      return enclosure;
    })
    .filter((entry): entry is RssEnclosure => entry !== null);
}

function normalizeFeedItem(raw: unknown): RssFeedItem | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const title = textValue(item.title);
  const link = textValue(item.link);
  if (!title || !link) return null;

  const enclosure = normalizeEnclosures(item.enclosure);
  return {
    title,
    link,
    description: textValue(item.description),
    pubDate: textValue(item.pubDate),
    ...(enclosure.length > 0 ? { enclosure } : {}),
  };
}

function parsePublishedAt(value: string | undefined): Date {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isFinite(parsed.getTime()) ? parsed : new Date();
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeMaxNewItems(value: number | undefined): number {
  if (value === undefined || value === Number.POSITIVE_INFINITY) {
    return Number.POSITIVE_INFINITY;
  }

  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }

  return Math.floor(value);
}

/**
 * Fetch and parse RSS feed from URL
 */
export async function fetchRssFeed(feedUrl: string): Promise<RssFeedItem[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        Accept:
          "application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (compatible; Unscaled RSS Fetcher)",
      },
    });

    if (response.status === 304) {
      console.log(`[RSS] Feed not modified (304) - keeping existing data`);
      return [];
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsed = (await parseStringPromise(xmlText, {
      explicitArray: false,
      trim: true,
    })) as ParsedRssFeed;

    const channel = asArray(parsed.rss?.channel)[0];
    const rawItems = asArray(channel?.item);
    return rawItems
      .map(normalizeFeedItem)
      .filter((item): item is RssFeedItem => item !== null);
  } catch (error) {
    console.error(`[RSS] Failed to fetch feed from ${feedUrl}:`, error);
    throw error;
  }
}

/**
 * Translate Chinese title to English using LLM
 */
export async function translateTitleToEnglish(
  chineseTitle: string
): Promise<string> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are a professional translator. Translate the given Chinese text to English. Return only the translation, nothing else.",
        },
        {
          role: "user",
          content: chineseTitle,
        },
      ],
      // Use minimal config for simple translation — no thinking needed
      max_tokens: 256,
    });

    const content = response.choices?.[0]?.message?.content;
    const translation =
      typeof content === "string" ? content.trim() : chineseTitle;
    return translation;
  } catch (error) {
    console.error(`[RSS] Failed to translate title "${chineseTitle}":`, error);
    // Fallback: return original title if translation fails
    return chineseTitle;
  }
}

/**
 * Extract image URL from RSS item
 */
function extractImageUrl(item: RssFeedItem): string | undefined {
  // Try to get image from enclosure
  if (item.enclosure && Array.isArray(item.enclosure)) {
    const imageEnclosure = item.enclosure.find(enc =>
      enc.type?.startsWith("image/")
    );
    if (imageEnclosure?.url) {
      return imageEnclosure.url;
    }
  }

  // Try to extract from description (simple regex for img src)
  if (item.description) {
    const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/);
    if (imgMatch?.[1]) {
      return imgMatch[1];
    }
  }

  return undefined;
}

/**
 * Process single RSS item: check if exists, translate, and store
 */
async function processRssItemDetailed(
  item: RssFeedItem,
  source: string = "aihot"
): Promise<ProcessRssItemResult> {
  try {
    // Check if item already exists
    const existingItem = await getRssItemByUrl(item.link);
    if (existingItem) {
      console.log(`[RSS] Item already exists: ${item.link}`);
      return "existing";
    }

    // Translate title
    console.log(`[RSS] Translating: ${item.title}`);
    const titleEn = await translateTitleToEnglish(item.title);

    // Prepare item data
    const rssItemData: InsertRssItem = {
      titleZh: item.title,
      titleEn,
      description: item.description?.substring(0, 1000),
      url: item.link,
      imageUrl: extractImageUrl(item),
      source,
      publishedAt: parsePublishedAt(item.pubDate),
      translated: true,
      visible: true,
    };

    // Store in database
    await createRssItem(rssItemData);
    console.log(`[RSS] Stored: ${item.title}`);
    return "stored";
  } catch (error) {
    console.error(`[RSS] Failed to process item:`, error);
    return "failed";
  }
}

export async function processRssItem(
  item: RssFeedItem,
  source: string = "aihot"
): Promise<boolean> {
  return (await processRssItemDetailed(item, source)) === "stored";
}

/**
 * Main RSS sync function: fetch feed and process all items
 */
export async function syncRssFeed(
  feedUrl: string = RSS_FEED_URL,
  source: string = "aihot",
  options: SyncRssFeedOptions = {}
) {
  try {
    console.log(`[RSS] Starting sync from ${feedUrl}`);
    const delayMs = options.delayMs ?? DEFAULT_LLM_DELAY_MS;
    const maxNewItems = normalizeMaxNewItems(options.maxNewItems);

    // Fetch feed
    const items = await fetchRssFeed(feedUrl);
    console.log(`[RSS] Fetched ${items.length} items`);

    const itemsToProcess = items;
    console.log(`[RSS] Processing ${itemsToProcess.length} items`);

    // Process each item
    let successCount = 0;
    let newAttemptCount = 0;
    for (const item of itemsToProcess) {
      if (newAttemptCount >= maxNewItems) {
        console.log(`[RSS] Reached new item limit: ${maxNewItems}`);
        break;
      }

      const result = await processRssItemDetailed(item, source);
      if (result === "existing") {
        continue;
      }

      newAttemptCount++;
      if (result === "stored") {
        successCount++;
        if (delayMs > 0) {
          await sleep(delayMs);
        }
      }
    }

    console.log(
      `[RSS] Sync complete: ${successCount}/${items.length} new items stored`
    );
    return { totalItems: items.length, newItems: successCount };
  } catch (error) {
    console.error(`[RSS] Sync failed:`, error);
    throw error;
  }
}

/**
 * RSS Fetcher & Translator
 * Handles fetching RSS feed, parsing items, and translating titles to English
 */

import { parseStringPromise } from "xml2js";
import { invokeLLM } from "./llm";
import { createRssItem, getRssItemByUrl } from "../db";
import { InsertRssItem } from "../../drizzle/schema";

interface RssFeedItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  enclosure?: Array<{ $: { url: string; type: string } }>;
}

interface ParsedRssFeed {
  rss: {
    channel: Array<{
      item?: RssFeedItem[];
    }>;
  };
}

/**
 * Fetch and parse RSS feed from URL
 */
export async function fetchRssFeed(feedUrl: string): Promise<RssFeedItem[]> {
  try {
    const response = await fetch(feedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Unscaled RSS Fetcher)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const xmlText = await response.text();
    const parsed = (await parseStringPromise(xmlText)) as ParsedRssFeed;

    const items = parsed.rss?.channel?.[0]?.item || [];
    return Array.isArray(items) ? items : [items];
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
    });

    const content = response.choices?.[0]?.message?.content;
    const translation =
      typeof content === "string" ? content.trim() : chineseTitle;
    return translation;
  } catch (error) {
    console.error(
      `[RSS] Failed to translate title "${chineseTitle}":`,
      error
    );
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
    const imageEnclosure = item.enclosure.find((enc) =>
      enc.$?.type?.startsWith("image/")
    );
    if (imageEnclosure?.$.url) {
      return imageEnclosure.$.url;
    }
  }

  // Try to extract from description (simple regex for img src)
  if (item.description) {
    const descStr = typeof item.description === "string" ? item.description : String(item.description);
    const imgMatch = descStr.match(/<img[^>]+src=["']([^"']+)["']/);
    if (imgMatch?.[1]) {
      return imgMatch[1];
    }
  }

  return undefined;
}

/**
 * Process single RSS item: check if exists, translate, and store
 */
export async function processRssItem(
  item: RssFeedItem,
  source: string = "aihot"
): Promise<boolean> {
  try {
    // Check if item already exists
    const existingItem = await getRssItemByUrl(item.link);
    if (existingItem) {
      console.log(`[RSS] Item already exists: ${item.link}`);
      return false;
    }

    // Translate title
    console.log(`[RSS] Translating: ${item.title}`);
    const titleEn = await translateTitleToEnglish(item.title);

    // Prepare item data
    let description: string | undefined = undefined;
    if (typeof item.description === "string") {
      description = item.description.substring(0, 1000);
    } else if (Array.isArray(item.description)) {
      description = (item.description as unknown[]).join(" ").substring(0, 1000);
    }

    const rssItemData: InsertRssItem = {
      titleZh: item.title,
      titleEn,
      description,
      url: item.link,
      imageUrl: extractImageUrl(item),
      source,
      publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
      translated: true,
      visible: true,
    };

    // Store in database
    await createRssItem(rssItemData);
    console.log(`[RSS] Stored: ${item.title}`);
    return true;
  } catch (error) {
    console.error(`[RSS] Failed to process item:`, error);
    return false;
  }
}

/**
 * Main RSS sync function: fetch feed and process all items
 */
export async function syncRssFeed(feedUrl: string, source: string = "aihot") {
  try {
    console.log(`[RSS] Starting sync from ${feedUrl}`);

    // Fetch feed
    const items = await fetchRssFeed(feedUrl);
    console.log(`[RSS] Fetched ${items.length} items`);

    // Limit to first 5 items for faster testing
    const itemsToProcess = items.slice(0, 5);
    console.log(`[RSS] Processing ${itemsToProcess.length} items`);

    // Process each item
    let successCount = 0;
    for (const item of itemsToProcess) {
      const success = await processRssItem(item, source);
      if (success) successCount++;
      // Add small delay to avoid rate limiting on LLM
      await new Promise((resolve) => setTimeout(resolve, 500));
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

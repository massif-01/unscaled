import { XMLParser } from "fast-xml-parser";
import { createRssItem, getRssItemByUrl } from "./db";
import { getEnv } from "./env";
import type { InsertRssItem } from "../db/schema";

const DEFAULT_FEED_URL = "https://aihot.virxact.com/feed.xml";
const MAX_NEW_ITEMS = 15;
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
});

type FeedItem = {
  title?: unknown;
  link?: unknown;
  description?: unknown;
  pubDate?: unknown;
  enclosure?: unknown;
};

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function textValue(value: unknown): string | undefined {
  if (typeof value === "string" || typeof value === "number") {
    const result = String(value).trim();
    return result || undefined;
  }
  if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    return textValue(object["#text"] ?? object["#cdata"] ?? object["@_url"]);
  }
  return undefined;
}

function parseDate(value: unknown): Date {
  const parsed = new Date(textValue(value) ?? "");
  return Number.isFinite(parsed.getTime()) ? parsed : new Date();
}

function extractImageUrl(item: FeedItem): string | undefined {
  const enclosure = asArray(item.enclosure).map(value => value as Record<string, unknown>);
  const image = enclosure.find(value => String(value["@_type"] ?? "").startsWith("image/"));
  const enclosureUrl = textValue(image?.["@_url"]);
  if (enclosureUrl) return enclosureUrl;
  const description = textValue(item.description);
  return description?.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
}

export async function fetchRssFeed(feedUrl: string): Promise<FeedItem[]> {
  const response = await fetch(feedUrl, {
    headers: {
      Accept: "application/rss+xml, application/xml, text/xml;q=0.9,*/*;q=0.8",
      "User-Agent": "Unscaled RSS Fetcher",
    },
  });
  if (!response.ok) throw new Error(`RSS feed returned ${response.status}`);
  const parsed = parser.parse(await response.text()) as { rss?: { channel?: { item?: FeedItem | FeedItem[] } } };
  return asArray(parsed.rss?.channel?.item);
}

async function translateTitle(title: string): Promise<string> {
  const apiKey = getEnv().OPENAI_API_KEY?.trim();
  if (!apiKey) return title;

  const baseUrl = (getEnv().OPENAI_BASE_URL ?? "https://api.openai.com/v1").replace(/\/$/, "");
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: getEnv().OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0,
      max_tokens: 128,
      messages: [
        { role: "system", content: "Translate the Chinese title to concise natural English. Return only the translation." },
        { role: "user", content: title },
      ],
    }),
  });
  if (!response.ok) throw new Error(`OpenAI translation returned ${response.status}`);
  const payload = await response.json() as { choices?: Array<{ message?: { content?: unknown } }> };
  return textValue(payload.choices?.[0]?.message?.content) ?? title;
}

export async function syncRssFeed() {
  const feedUrl = getEnv().RSS_FEED_URL ?? DEFAULT_FEED_URL;
  const items = await fetchRssFeed(feedUrl);
  let stored = 0;
  let attempted = 0;

  for (const item of items) {
    if (attempted >= MAX_NEW_ITEMS) break;
    const title = textValue(item.title);
    const url = textValue(item.link);
    if (!title || !url || await getRssItemByUrl(url)) continue;
    attempted += 1;

    try {
      const data: InsertRssItem = {
        titleZh: title,
        titleEn: await translateTitle(title),
        description: textValue(item.description)?.slice(0, 1000),
        url,
        imageUrl: extractImageUrl(item),
        source: "aihot",
        publishedAt: parseDate(item.pubDate),
        translated: Boolean(getEnv().OPENAI_API_KEY),
        visible: true,
      };
      await createRssItem(data);
      stored += 1;
    } catch (error) {
      console.error("[RSS] failed to store item", url, error);
    }
  }

  return { totalItems: items.length, newItems: stored };
}

function matchesSecret(expected: string, received: string | null) {
  if (!received || expected.length !== received.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ received.charCodeAt(index);
  }
  return difference === 0;
}

export async function handleRssSync(expectedSecret: string | undefined, receivedSecret: string | null) {
  const expected = expectedSecret?.trim() ?? "";
  if (!expected || !matchesSecret(expected, receivedSecret)) {
    console.error("[RSS Sync] authorization failed", {
      configured: Boolean(expected),
      expectedLength: expected.length,
      receivedLength: receivedSecret?.length ?? 0,
    });
    return Response.json({ error: "cron-only" }, { status: 403 });
  }

  try {
    return Response.json({ ok: true, message: "RSS sync completed", ...(await syncRssFeed()) });
  } catch (error) {
    console.error("[RSS Sync] failed", error);
    return Response.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

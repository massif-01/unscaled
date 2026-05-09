import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchRssFeed,
  processRssItem,
  syncRssFeed,
  translateTitleToEnglish,
} from "./_core/rss";

const dbMocks = vi.hoisted(() => ({
  createRssItem: vi.fn(),
  getRssItemByUrl: vi.fn(),
}));

const llmMocks = vi.hoisted(() => ({
  invokeLLM: vi.fn(),
}));

vi.mock("./db", () => ({
  createRssItem: dbMocks.createRssItem,
  getRssItemByUrl: dbMocks.getRssItemByUrl,
}));

vi.mock("./_core/llm", () => ({
  invokeLLM: llmMocks.invokeLLM,
}));

const originalFetch = globalThis.fetch;

function mockFetchResponse(body: string, status: number = 200) {
  vi.mocked(globalThis.fetch).mockResolvedValue(
    new Response(status === 304 ? null : body, {
      status,
      statusText: status === 200 ? "OK" : "",
    })
  );
}

function mockTranslation(text: string) {
  llmMocks.invokeLLM.mockResolvedValue({
    id: "completion-1",
    created: 0,
    model: "test-model",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: text },
        finish_reason: "stop",
      },
    ],
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  globalThis.fetch = vi.fn() as unknown as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe("RSS feed parsing", () => {
  it("normalizes xml2js scalar fields and enclosures", async () => {
    mockFetchResponse(`
      <rss>
        <channel>
          <item>
            <title>测试标题</title>
            <link>https://example.com/a</link>
            <description><![CDATA[<p>摘要</p><img src="https://example.com/fallback.png"/>]]></description>
            <pubDate>Sun, 10 May 2026 00:00:00 GMT</pubDate>
            <enclosure url="https://example.com/cover.png" type="image/png" />
          </item>
        </channel>
      </rss>
    `);

    const items = await fetchRssFeed("https://example.com/feed.xml");

    expect(items).toEqual([
      {
        title: "测试标题",
        link: "https://example.com/a",
        description: '<p>摘要</p><img src="https://example.com/fallback.png"/>',
        pubDate: "Sun, 10 May 2026 00:00:00 GMT",
        enclosure: [
          {
            url: "https://example.com/cover.png",
            type: "image/png",
          },
        ],
      },
    ]);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://example.com/feed.xml",
      expect.objectContaining({
        headers: expect.objectContaining({
          "User-Agent": expect.stringContaining("Unscaled RSS Fetcher"),
        }),
      })
    );
  });

  it("drops malformed feed items instead of storing array-shaped data", async () => {
    mockFetchResponse(`
      <rss>
        <channel>
          <item><title>Missing link</title></item>
          <item><title>Valid</title><link>https://example.com/valid</link></item>
        </channel>
      </rss>
    `);

    await expect(fetchRssFeed("https://example.com/feed.xml")).resolves.toEqual(
      [
        {
          title: "Valid",
          link: "https://example.com/valid",
          description: undefined,
          pubDate: undefined,
        },
      ]
    );
  });

  it("treats HTTP 304 as no new items", async () => {
    mockFetchResponse("", 304);

    await expect(fetchRssFeed("https://example.com/feed.xml")).resolves.toEqual(
      []
    );
  });
});

describe("RSS translation and storage", () => {
  it("returns the translated title from the LLM", async () => {
    mockTranslation("Future directions for artificial intelligence");

    await expect(
      translateTitleToEnglish("人工智能的未来发展方向")
    ).resolves.toBe("Future directions for artificial intelligence");
  });

  it("falls back to the original title when translation fails", async () => {
    llmMocks.invokeLLM.mockRejectedValue(new Error("missing key"));

    await expect(translateTitleToEnglish("人工智能")).resolves.toBe("人工智能");
  });

  it("skips existing RSS items before calling the LLM", async () => {
    dbMocks.getRssItemByUrl.mockResolvedValue({ id: 1 });

    await expect(
      processRssItem({
        title: "Existing",
        link: "https://example.com/existing",
      })
    ).resolves.toBe(false);

    expect(llmMocks.invokeLLM).not.toHaveBeenCalled();
    expect(dbMocks.createRssItem).not.toHaveBeenCalled();
  });

  it("stores new items with normalized metadata", async () => {
    dbMocks.getRssItemByUrl.mockResolvedValue(undefined);
    dbMocks.createRssItem.mockResolvedValue({ id: 2 });
    mockTranslation("Translated title");

    await expect(
      processRssItem({
        title: "新标题",
        link: "https://example.com/new",
        description: '<p>摘要</p><img src="https://example.com/fallback.png">',
        pubDate: "Sun, 10 May 2026 00:00:00 GMT",
        enclosure: [
          { url: "https://example.com/cover.png", type: "image/png" },
        ],
      })
    ).resolves.toBe(true);

    expect(dbMocks.createRssItem).toHaveBeenCalledWith(
      expect.objectContaining({
        titleZh: "新标题",
        titleEn: "Translated title",
        url: "https://example.com/new",
        imageUrl: "https://example.com/cover.png",
        translated: true,
        visible: true,
      })
    );
  });

  it("syncs deterministically without live network, DB, or LLM services", async () => {
    mockFetchResponse(`
      <rss>
        <channel>
          <item><title>Old</title><link>https://example.com/old</link></item>
          <item><title>New</title><link>https://example.com/new</link></item>
        </channel>
      </rss>
    `);
    dbMocks.getRssItemByUrl
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce(undefined);
    dbMocks.createRssItem.mockResolvedValue({ id: 2 });
    mockTranslation("New translated");

    await expect(
      syncRssFeed("https://example.com/feed.xml", "example", { delayMs: 0 })
    ).resolves.toEqual({ totalItems: 2, newItems: 1 });

    expect(dbMocks.createRssItem).toHaveBeenCalledTimes(1);
  });

  it("caps new items processed in one sync", async () => {
    mockFetchResponse(`
      <rss>
        <channel>
          <item><title>One</title><link>https://example.com/one</link></item>
          <item><title>Two</title><link>https://example.com/two</link></item>
          <item><title>Three</title><link>https://example.com/three</link></item>
        </channel>
      </rss>
    `);
    dbMocks.getRssItemByUrl.mockResolvedValue(undefined);
    dbMocks.createRssItem.mockResolvedValue({ id: 2 });
    mockTranslation("Translated");

    await expect(
      syncRssFeed("https://example.com/feed.xml", "example", {
        delayMs: 0,
        maxNewItems: 2,
      })
    ).resolves.toEqual({ totalItems: 3, newItems: 2 });

    expect(dbMocks.getRssItemByUrl).toHaveBeenCalledTimes(2);
    expect(llmMocks.invokeLLM).toHaveBeenCalledTimes(2);
    expect(dbMocks.createRssItem).toHaveBeenCalledTimes(2);
  });

  it("counts failed new-item attempts against the sync cap", async () => {
    mockFetchResponse(`
      <rss>
        <channel>
          <item><title>One</title><link>https://example.com/one</link></item>
          <item><title>Two</title><link>https://example.com/two</link></item>
          <item><title>Three</title><link>https://example.com/three</link></item>
        </channel>
      </rss>
    `);
    dbMocks.getRssItemByUrl.mockResolvedValue(undefined);
    dbMocks.createRssItem.mockRejectedValue(new Error("database down"));
    mockTranslation("Translated");

    await expect(
      syncRssFeed("https://example.com/feed.xml", "example", {
        delayMs: 0,
        maxNewItems: 2,
      })
    ).resolves.toEqual({ totalItems: 3, newItems: 0 });

    expect(dbMocks.getRssItemByUrl).toHaveBeenCalledTimes(2);
    expect(llmMocks.invokeLLM).toHaveBeenCalledTimes(2);
    expect(dbMocks.createRssItem).toHaveBeenCalledTimes(2);
  });
});

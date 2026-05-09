import type { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ENV } from "./_core/env";
import { rssSyncHandler } from "./_core/rss-sync-handler";
import { syncRssFeed } from "./_core/rss";

vi.mock("./_core/rss", () => ({
  syncRssFeed: vi.fn(),
}));

const originalEnv = {
  isProduction: ENV.isProduction,
  rssSyncSecret: ENV.rssSyncSecret,
};

function createRequest({
  body,
  headers = {},
}: {
  body?: unknown;
  headers?: Record<string, string>;
} = {}): Request {
  return {
    body,
    url: "/api/scheduled/sync-rss",
    get(name: string) {
      return headers[name.toLowerCase()];
    },
  } as Request;
}

function createResponse() {
  const response = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };

  return response as Response & { statusCode: number; body: unknown };
}

beforeEach(() => {
  vi.clearAllMocks();
  ENV.isProduction = true;
  ENV.rssSyncSecret = "test-secret";
  vi.mocked(syncRssFeed).mockResolvedValue({ totalItems: 1, newItems: 1 });
});

afterEach(() => {
  ENV.isProduction = originalEnv.isProduction;
  ENV.rssSyncSecret = originalEnv.rssSyncSecret;
});

describe("RSS sync scheduled handler", () => {
  it("rejects unauthenticated production requests", async () => {
    const res = createResponse();

    await rssSyncHandler(createRequest(), res);

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({ error: "cron-only" });
    expect(syncRssFeed).not.toHaveBeenCalled();
  });

  it("accepts the configured secret and caps the sync batch", async () => {
    const res = createResponse();

    await rssSyncHandler(
      createRequest({ headers: { "x-rss-sync-secret": "test-secret" } }),
      res
    );

    expect(syncRssFeed).toHaveBeenCalledWith(
      "https://aihot.virxact.com/feed.xml",
      "aihot",
      { maxNewItems: 15 }
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      message: "RSS sync completed",
      totalItems: 1,
      newItems: 1,
    });
  });

  it("keeps the legacy Manus cron-header path when no secret is configured", async () => {
    ENV.rssSyncSecret = "";
    const res = createResponse();

    await rssSyncHandler(
      createRequest({ headers: { "x-manus-cron-task-uid": "task-1" } }),
      res
    );

    expect(syncRssFeed).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(200);
  });
});

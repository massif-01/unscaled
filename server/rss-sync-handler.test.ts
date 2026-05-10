import type { Request, Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ENV } from "./_core/env";
import { rssSyncHandler } from "./_core/rss-sync-handler";
import { syncRssFeed } from "./_core/rss";

const sdkMocks = vi.hoisted(() => ({
  authenticateRequest: vi.fn(),
}));

vi.mock("./_core/rss", () => ({
  syncRssFeed: vi.fn(),
}));

vi.mock("./_core/sdk", () => ({
  sdk: {
    authenticateRequest: sdkMocks.authenticateRequest,
  },
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
  sdkMocks.authenticateRequest.mockRejectedValue(
    new Error("missing cron cookie")
  );
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

  it("accepts Manus cron cookie auth before requiring a configured secret", async () => {
    sdkMocks.authenticateRequest.mockResolvedValue({
      id: -1,
      openId: "cron_task",
      name: "Manus Scheduled Task",
      email: null,
      loginMethod: null,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
      isCron: true,
      taskUid: "task-1",
    });

    const res = createResponse();

    await rssSyncHandler(createRequest(), res);

    expect(syncRssFeed).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(200);
  });

  it("keeps the legacy Manus cron-header path even when a secret is configured", async () => {
    const res = createResponse();

    await rssSyncHandler(
      createRequest({ headers: { "x-manus-cron-task-uid": "task-1" } }),
      res
    );

    expect(syncRssFeed).toHaveBeenCalledOnce();
    expect(res.statusCode).toBe(200);
  });

  it("rejects regular user cookies without a valid Manus cron identity", async () => {
    ENV.rssSyncSecret = "";
    sdkMocks.authenticateRequest.mockResolvedValue({
      id: 1,
      openId: "user-1",
      name: "Regular User",
      email: null,
      loginMethod: null,
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });
    const res = createResponse();

    await rssSyncHandler(createRequest(), res);

    expect(res.statusCode).toBe(403);
    expect(syncRssFeed).not.toHaveBeenCalled();
  });
});

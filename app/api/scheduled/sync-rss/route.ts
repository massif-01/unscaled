import { handleRssSync } from "../../../../server/rss";
import { getEnv } from "../../../../server/env";

export async function POST(request: Request) {
  return handleRssSync(getEnv().RSS_SYNC_SECRET, request.headers.get("x-rss-sync-secret"));
}

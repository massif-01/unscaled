# Unscaled on Sites

This is the Sites/Cloudflare Worker migration of [massif-01/unscaled](https://github.com/massif-01/unscaled).
The public pages and SignalField interaction are kept from the original project.

## Runtime changes

- Vinext + Cloudflare Worker replaces the Manus Express runtime.
- D1 replaces MySQL for navigation, content, users, and RSS items.
- Sites Sign in with ChatGPT replaces Manus OAuth for `/admin`.
- RSS sync runs through `/api/scheduled/sync-rss` and a Cloudflare Cron Trigger; the included GitHub Actions workflow is a portable fallback.
- New RSS titles can use the server-only `OPENAI_API_KEY` adapter; without it, the original Chinese title is retained as the fallback.

## Required production variables

- `ADMIN_EMAIL`: the ChatGPT account allowed to use `/admin`.
- `RSS_SYNC_SECRET`: secret used by external scheduled calls.
- `OPENAI_API_KEY`: optional for English RSS title translation.
- `OPENAI_MODEL`: optional; defaults to `gpt-4o-mini`.
- `OPENAI_BASE_URL`: optional OpenAI-compatible API base URL.
- `RSS_FEED_URL`: optional; defaults to `https://aihot.virxact.com/feed.xml`.

The GitHub Actions fallback expects `UNSCALED_SITE_URL` and `RSS_SYNC_SECRET` repository secrets.

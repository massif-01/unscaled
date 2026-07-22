import { useEffect, useRef, useState } from "react";
import { SecondaryHeader } from "@/components/SecondaryPage";
import { trpc } from "@/lib/trpc";

interface RssItem {
  id: number;
  titleZh: string;
  titleEn: string | null;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: Date | null;
  visible: boolean;
}

const PAGE_SIZE = 10;

function cleanDescription(value: string | null) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceLabel(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "Source";
  }
}

function formatDate(value: Date | null) {
  if (!value) return "Latest";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "Latest";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function InfoPage() {
  const [items, setItems] = useState<RssItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadedOffsetsRef = useRef<Set<number>>(new Set());

  const {
    data: pageItems,
    isFetching,
    isError,
    error: queryError,
  } = trpc.rss.list.useQuery({ offset, limit: PAGE_SIZE });

  useEffect(() => {
    if (isError) {
      console.error("[RSS Query Error]", queryError);
      setError("The latest items could not be loaded.");
      setHasMore(false);
      return;
    }

    if (isFetching || !pageItems) return;

    setError(null);
    setHasMore(pageItems.length === PAGE_SIZE);
    if (loadedOffsetsRef.current.has(offset)) return;

    loadedOffsetsRef.current.add(offset);
    setItems((previous) => {
      const seen = new Set(previous.map((item) => item.id));
      const nextItems = pageItems.filter((item) => !seen.has(item.id));
      return nextItems.length > 0 ? [...previous, ...nextItems] : previous;
    });
  }, [isError, isFetching, offset, pageItems, queryError]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || items.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasMore && !isFetching) {
        setOffset((previous) => previous + PAGE_SIZE);
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isFetching, items.length]);

  useEffect(() => {
    document.title = "Info — Unscaled";
  }, []);

  return (
    <main className="secondary-page" lang="zh-CN">
      <SecondaryHeader section="Info / Latest" />

      <div className="secondary-wrap info-wrap">
        <div className="info-heading">
          <h1 className="secondary-title">Info</h1>
        </div>

        {items.length > 0 && (
          <div className="news-list" aria-busy={isFetching}>
            {items.map((item) => (
              <a
                className="news-item"
                href={item.url}
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="news-meta">
                  <span className="news-date">
                    {formatDate(item.publishedAt)}
                  </span>
                  <span className="news-source">{sourceLabel(item.url)}</span>
                </span>
                <h2 className="news-title">{item.titleZh}</h2>
                <p className="news-description">
                  {cleanDescription(item.description) ||
                    item.titleEn ||
                    "打开原文阅读全文。"}
                </p>
                <span className="news-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        )}

        {error && (
          <div className="secondary-status" role="alert">
            <p>暂时无法加载最新新闻。</p>
            <p className="secondary-status-detail">{error}</p>
          </div>
        )}

        {!error && items.length === 0 && !isFetching && (
          <div className="secondary-status">
            <p>新闻列表暂时为空。</p>
          </div>
        )}

        <div
          className="secondary-status"
          ref={observerTarget}
          aria-live="polite"
        >
          {isFetching && <p>正在加载…</p>}
          {!hasMore && items.length > 0 && (
            <p className="secondary-status-detail">已显示全部新闻</p>
          )}
        </div>
      </div>
    </main>
  );
}

/*
 * Info Page — Latest AI News & Insights
 * Displays RSS feed from aihot.virxact.com with infinite scroll loading
 */

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
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

export default function InfoPage() {
  const [items, setItems] = useState<RssItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const loadedOffsetsRef = useRef<Set<number>>(new Set());

  // Fetch RSS items with pagination
  const {
    data: pageItems,
    isFetching,
    isError,
    error: queryError,
  } = trpc.rss.list.useQuery({
    offset,
    limit: PAGE_SIZE,
  });

  const isLoading = isFetching;

  // Load more items when page changes
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

    if (loadedOffsetsRef.current.has(offset)) {
      return;
    }

    loadedOffsetsRef.current.add(offset);

    if (pageItems.length > 0) {
      setItems(prev => {
        const seen = new Set(prev.map(item => item.id));
        const nextItems = pageItems.filter(item => !seen.has(item.id));
        return nextItems.length > 0 ? [...prev, ...nextItems] : prev;
      });
    }
  }, [pageItems, isFetching, isError, queryError, offset]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setOffset(prev => prev + PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    document.title = "Info — Unscaled";
  }, []);

  const formatDate = (date?: Date | null) => {
    if (!date) return "";
    try {
      const d = date instanceof Date ? date : new Date(date);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100dvh",
        background: "oklch(0.98 0.008 85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: "clamp(2.2rem, 8vw, 7rem)",
        paddingRight: "clamp(2.2rem, 8vw, 7rem)",
        paddingTop: "clamp(6rem, 12vw, 10rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        overflow: "auto",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Back link */}
      <Link href="/">
        <span
          style={{
            position: "fixed",
            top: "clamp(1.5rem, 3vw, 2.5rem)",
            left: "clamp(2.2rem, 8vw, 7rem)",
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.20em",
            color: "oklch(0.55 0.008 65)",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: 0.7,
            textDecoration: "none",
            zIndex: 10,
          }}
        >
          ← Unscaled
        </span>
      </Link>

      {/* Header */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "0.04em",
            color: "oklch(0.12 0.008 60)",
            margin: "0 0 clamp(1rem, 2vw, 1.5rem) 0",
            padding: 0,
          }}
        >
          Info
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
            letterSpacing: "0.015em",
            color: "oklch(0.50 0.010 65)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Latest AI News & Insights
        </p>

        {/* Hairline */}
        <div
          style={{
            width: "clamp(2rem, 4vw, 3.5rem)",
            height: "1px",
            background: "oklch(0.72 0.008 65)",
            margin: "clamp(1.5rem, 3vw, 2.5rem) auto 0",
          }}
        />
      </div>

      {/* Content area */}
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {/* Error state */}
        {error && (
          <div
            style={{
              textAlign: "center",
              padding: "clamp(2rem, 4vw, 4rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1rem",
              color: "oklch(0.60 0.008 30)",
            }}
          >
            <p>Unable to load RSS feed at this moment.</p>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.6,
                marginTop: "1rem",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && items.length === 0 && !isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "clamp(3rem, 6vw, 5rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.1rem",
              color: "oklch(0.50 0.010 65)",
            }}
          >
            <p>No news items available yet.</p>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.6,
                marginTop: "1rem",
              }}
            >
              Check back soon for the latest AI insights.
            </p>
          </div>
        )}

        {/* RSS items grid */}
        {items.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              width: "100%",
            }}
          >
            {items.map((item: RssItem) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    background: "oklch(0.95 0.008 85)",
                    border: "1px solid oklch(0.85 0.008 65)",
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "oklch(0.12 0.008 60)";
                    el.style.boxShadow =
                      "0 4px 12px oklch(0.12 0.008 60 / 0.1)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "oklch(0.85 0.008 65)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  {item.imageUrl && (
                    <div
                      style={{
                        width: "100%",
                        height: "160px",
                        overflow: "hidden",
                        backgroundColor: "oklch(0.85 0.008 65)",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.titleZh}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div
                    style={{
                      padding: "clamp(1rem, 2vw, 1.5rem)",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Chinese title */}
                    <h3
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                        fontWeight: 600,
                        lineHeight: 1.4,
                        color: "oklch(0.12 0.008 60)",
                        margin: "0 0 0.5rem 0",
                      }}
                    >
                      {item.titleZh}
                    </h3>

                    {/* English title */}
                    {item.titleEn && (
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "0.9rem",
                          fontStyle: "italic",
                          lineHeight: 1.3,
                          color: "oklch(0.50 0.010 65)",
                          margin: "0 0 0.8rem 0",
                        }}
                      >
                        {item.titleEn}
                      </p>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: "0.85rem",
                          lineHeight: 1.5,
                          color: "oklch(0.55 0.008 65)",
                          margin: "0 0 auto 0",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {item.description
                          .replace(/<[^>]*>/g, "")
                          .substring(0, 150)}
                        ...
                      </p>
                    )}

                    {/* Date */}
                    {item.publishedAt && (
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "0.75rem",
                          letterSpacing: "0.05em",
                          color: "oklch(0.60 0.008 65)",
                          textTransform: "uppercase",
                          margin: "0.8rem 0 0 0",
                          marginTop: "auto",
                        }}
                      >
                        {formatDate(item.publishedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div
          ref={observerTarget}
          style={{
            marginTop: "clamp(3rem, 6vw, 5rem)",
            textAlign: "center",
            minHeight: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLoading && (
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1rem",
                color: "oklch(0.50 0.010 65)",
              }}
            >
              Loading more...
            </p>
          )}
          {!hasMore && items.length > 0 && (
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
                color: "oklch(0.60 0.008 65)",
                textTransform: "uppercase",
                opacity: 0.5,
              }}
            >
              No more items
            </p>
          )}
        </div>
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: "clamp(4rem, 8vw, 6rem)",
          textAlign: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          color: "oklch(0.60 0.008 65)",
          textTransform: "uppercase",
        }}
      >
        <p style={{ margin: 0, opacity: 0.5 }}>
          Updated daily • Powered by aihot.virxact.com
        </p>
      </div>

      {/* Decorative grain */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "40vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at 80% 80%, oklch(0.90 0.006 65 / 0.25) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}

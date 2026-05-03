/*
 * Home — Unscaled "Signal in the Void"
 * Nav nodes are loaded dynamically from a lightweight public JSON endpoint.
 * Falls back to static defaults if the API returns empty (e.g. first load).
 *
 * Layout:
 *   Desktop (≥ 640px): side-by-side — wordmark left 46%, signal field right 54%
 *   Mobile  (< 640px): side-by-side — wordmark left 42%, signal field right 58%
 */

import { useEffect, useState } from "react";
import SignalField, { NavNode } from "@/components/SignalField";

type PublicNavNode = {
  id: string | number;
  label: string;
  url: string;
  posX?: string | null;
  posY?: string | null;
};

// SEO: visually hidden utility
const srOnly: React.CSSProperties = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

// Static fallback nodes — used while DB loads or if DB is empty
const FALLBACK_NODES: NavNode[] = [
  { id: "github",   label: "Github",   url: "https://github.com/massif-01" },
  { id: "podcast",  label: "Podcast",  url: "https://unscaled.podcast.xyz" },
  { id: "ai",       label: "AI",       url: "/ai" },
  { id: "info",     label: "Info",     url: "/info" },
  { id: "auracap",  label: "AuraCAP",  url: "https://github.com/massif-01/AuraCap" },
];

function isPublicNavNode(value: unknown): value is PublicNavNode {
  if (!value || typeof value !== "object") return false;
  const node = value as Record<string, unknown>;
  const hasValidId =
    typeof node.id === "string" || typeof node.id === "number";
  return (
    hasValidId &&
    typeof node.label === "string" &&
    node.label.trim().length > 0 &&
    typeof node.url === "string" &&
    node.url.trim().length > 0
  );
}

function parsePosition(value: string | null | undefined) {
  if (!value) return undefined;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function toNavNode(node: PublicNavNode): NavNode {
  return {
    id: String(node.id),
    label: node.label,
    url: node.url,
    nx: parsePosition(node.posX),
    ny: parsePosition(node.posY),
  };
}

// Simple breakpoint hook
function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    setMobile(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dbNodes, setDbNodes] = useState<NavNode[] | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    document.title = "Unscaled — Beyond the Scale, Observer's Freedom";
    return () => clearTimeout(t);
  }, []);

  // Load nav nodes from DB through a small public JSON endpoint.
  useEffect(() => {
    const controller = new AbortController();

    async function loadNavNodes() {
      try {
        const response = await fetch("/api/nav-nodes", {
          signal: controller.signal,
          credentials: "same-origin",
        });
        if (!response.ok) return;

        const payload: unknown = await response.json();
        if (!Array.isArray(payload)) return;
        if (!payload.every(isPublicNavNode)) return;

        const nodes = payload.map(toNavNode);
        if (!controller.signal.aborted && nodes.length > 0) {
          setDbNodes(nodes);
        }
      } catch {
        // Keep the static fallback on network or parsing failures.
      }
    }

    void loadNavNodes();

    return () => controller.abort();
  }, []);

  const navNodes: NavNode[] =
    dbNodes && dbNodes.length > 0
      ? dbNodes
      : FALLBACK_NODES;

  // Both mobile and desktop use side-by-side layout.
  // Mobile: wordmark 42vw | desktop: wordmark 46%
  const wordmarkWidth = isMobile ? "42vw" : "46%";
  const wordmarkPadLeft = isMobile
    ? "clamp(1.2rem, 4vw, 1.8rem)"
    : "clamp(3.2rem, 7vw, 6.5rem)";
  const wordmarkPadRight = isMobile ? "0.6rem" : "1.2rem";
  const h1FontSize = isMobile
    ? "clamp(2.2rem, 9vw, 3.4rem)"
    : "clamp(3.8rem, 6.5vw, 8rem)";
  const taglineFontSize = isMobile
    ? "clamp(0.72rem, 2.8vw, 0.92rem)"
    : "clamp(1rem, 1.4vw, 1.25rem)";

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        display: "flex",
        flexDirection: "row",   // always side-by-side
        overflow: "hidden",
        background: "oklch(0.98 0.008 85)",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* SEO: visually hidden H2 */}
      <h2 style={srOnly}>Unscaled — Podcast, AI, GitHub &amp; essays beyond hardware metrics.</h2>

      {/* ── Wordmark ─────────────────────────────────────────────────────── */}
      <div
        style={{
          width: wordmarkWidth,
          flexShrink: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: wordmarkPadLeft,
          paddingRight: wordmarkPadRight,
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* H1 Wordmark */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0px)" : "translateY(16px)",
            transition:
              "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: h1FontSize,
              lineHeight: 0.92,
              letterSpacing: "0.04em",
              color: "oklch(0.12 0.008 60)",
              margin: 0,
              padding: 0,
              whiteSpace: "nowrap",
            }}
          >
            Unscaled
          </h1>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0px)" : "translateY(12px)",
            transition:
              "opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: taglineFontSize,
              letterSpacing: "0.015em",
              color: "oklch(0.50 0.010 65)",
              marginTop: isMobile ? "0.5rem" : "clamp(1rem, 2vw, 1.8rem)",
              marginBottom: 0,
              lineHeight: 1.55,
              maxWidth: "18ch",
            }}
          >
            The observer's freedom.
            <br />
            Beyond the scale.
          </p>
        </div>

        {/* Hairline — desktop only */}
        {!isMobile && (
          <div
            style={{
              width: mounted ? "clamp(2rem, 3.5vw, 3rem)" : "0px",
              height: "1px",
              background: "oklch(0.72 0.008 65)",
              marginTop: "clamp(1.8rem, 3vw, 2.8rem)",
              transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
            }}
          />
        )}

        {/* Domain — desktop only */}
        {!isMobile && (
          <div
            style={{
              opacity: mounted ? 0.55 : 0,
              transition: "opacity 2s ease 0.7s",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(8px, 0.85vw, 10px)",
                letterSpacing: "0.18em",
                color: "oklch(0.60 0.008 65)",
                marginTop: "clamp(0.9rem, 1.5vw, 1.3rem)",
                display: "block",
                textTransform: "uppercase",
              }}
            >
              unscaled.me
            </span>
          </div>
        )}
      </div>

      {/* ── Vertical Divider ─────────────────────────────────────────────── */}
      {/* Positioned at the right edge of the wordmark column, always visible */}
      <div
        style={{
          width: "1px",
          height: isMobile ? "28%" : "35%",
          alignSelf: "center",
          background:
            "linear-gradient(to bottom, transparent, oklch(0.80 0.006 65) 25%, oklch(0.80 0.006 65) 75%, transparent)",
          flexShrink: 0,
          opacity: mounted ? 0.65 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      />

      {/* ── Signal Field ─────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          minWidth: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 1.8s ease 0.25s",
        }}
      >
        <SignalField nodes={navNodes} />
        <HoverHint isMobile={isMobile} />
      </div>

      {/* ── Bottom-left meta ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: isMobile ? "0.6rem" : "clamp(1.2rem, 2.5vw, 2rem)",
          left: isMobile ? "clamp(1.8rem, 6.5vw, 2.8rem)" : "clamp(3.2rem, 7vw, 6.5rem)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "7px",
          letterSpacing: "0.18em",
          color: "oklch(0.68 0.006 65)",
          opacity: mounted ? 0.5 : 0,
          transition: "opacity 2.5s ease 1s",
          textTransform: "uppercase",
        }}
      >
        {new Date().getFullYear()} · Signal Active
      </div>
    </div>
  );
}

function HoverHint({ isMobile }: { isMobile: boolean }) {
  const [vis, setVis] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVis(false), 5500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        bottom: isMobile ? "0.6rem" : "clamp(1.2rem, 2.5vw, 2rem)",
        right: isMobile ? "0.6rem" : "clamp(1.5rem, 3vw, 2.5rem)",
        fontFamily: "'Space Mono', monospace",
        fontSize: "7px",
        letterSpacing: "0.16em",
        color: "oklch(0.60 0.008 65)",
        opacity: vis ? 0.45 : 0,
        transition: "opacity 1.8s ease",
        pointerEvents: "none",
        textTransform: "uppercase",
      }}
    >
      {isMobile ? "tap · drag · explore" : "hover · drag · explore"}
    </div>
  );
}

/*
 * Home — Unscaled "Signal in the Void"
 *
 * Design System:
 * - Background: warm paper white oklch(0.98 0.008 85)
 * - Wordmark: Cormorant Garamond 700, ~9vw, ink black
 * - Tagline: Cormorant Garamond 300 italic, muted
 * - Signal field: right 62%, Canvas-rendered, indigo nodes
 * - Typography meta: Space Mono 400, 9-11px, uppercase
 * - No scroll. Full viewport. Stillness is the default state.
 */

import { useEffect, useState } from "react";
import SignalField, { NavNode } from "@/components/SignalField";

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

// ─────────────────────────────────────────────────────────────────────────────
// NAV_NODES — Edit this array to add/remove navigation destinations.
// Each node requires: id (unique), label (display text), url (destination).
// Optional: nx/ny (0–1 normalized canvas position) to override auto-placement.
// ─────────────────────────────────────────────────────────────────────────────
const NAV_NODES: NavNode[] = [
  {
    id: "github",
    label: "Github",
    url: "https://github.com",
  },
  {
    id: "podcast",
    label: "Podcast",
    url: "https://unscaled.me/podcast",
  },
  {
    id: "ai",
    label: "AI",
    url: "https://unscaled.me/ai",
  },
  {
    id: "info",
    label: "Info",
    url: "https://unscaled.me/info",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    // SEO: set document.title explicitly as required
    document.title = "Unscaled — Beyond the Scale, Observer's Freedom";
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        background: "oklch(0.98 0.008 85)",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* SEO: visually hidden H2 for crawlers */}
      <h2 style={srOnly}>
        Unscaled — Personal space for podcast, AI experiments, GitHub projects, and essays beyond hardware metrics.
      </h2>

      {/* ── Left: Wordmark Column ───────────────────────────────────────── */}
      <div
        style={{
          width: "38%",
          minWidth: "260px",
          maxWidth: "520px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "clamp(2.2rem, 5.5vw, 5.5rem)",
          paddingRight: "1.5rem",
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
        }}
      >
        {/* Wordmark — the inscription */}
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
              fontSize: "clamp(3.8rem, 7.5vw, 8.5rem)",
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
              fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
              letterSpacing: "0.015em",
              color: "oklch(0.50 0.010 65)",
              marginTop: "clamp(1rem, 2vw, 1.8rem)",
              marginBottom: 0,
              lineHeight: 1.55,
              maxWidth: "20ch",
            }}
          >
            The observer's freedom.
            <br />
            Beyond the scale.
          </p>
        </div>

        {/* Hairline rule */}
        <div
          style={{
            width: mounted ? "clamp(2rem, 3.5vw, 3rem)" : "0px",
            height: "1px",
            background: "oklch(0.72 0.008 65)",
            marginTop: "clamp(1.8rem, 3vw, 2.8rem)",
            transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        />

        {/* Domain */}
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
      </div>

      {/* ── Vertical Divider ────────────────────────────────────────────── */}
      <div
        style={{
          width: "1px",
          height: "35%",
          alignSelf: "center",
          background:
            "linear-gradient(to bottom, transparent, oklch(0.80 0.006 65) 25%, oklch(0.80 0.006 65) 75%, transparent)",
          flexShrink: 0,
          opacity: mounted ? 0.65 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      />

      {/* ── Right: Signal Field ─────────────────────────────────────────── */}
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
        <SignalField nodes={NAV_NODES} />
        <HoverHint />
      </div>

      {/* ── Bottom-left meta ────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(1.2rem, 2.5vw, 2rem)",
          left: "clamp(2.2rem, 5.5vw, 5.5rem)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "8px",
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

// ── Hover hint — fades after 5s ───────────────────────────────────────────────
function HoverHint() {
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVis(false), 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "clamp(1.2rem, 2.5vw, 2rem)",
        right: "clamp(1.5rem, 3vw, 2.5rem)",
        fontFamily: "'Space Mono', monospace",
        fontSize: "8px",
        letterSpacing: "0.16em",
        color: "oklch(0.60 0.008 65)",
        opacity: vis ? 0.45 : 0,
        transition: "opacity 1.8s ease",
        pointerEvents: "none",
        textTransform: "uppercase",
      }}
    >
      hover nodes to navigate
    </div>
  );
}

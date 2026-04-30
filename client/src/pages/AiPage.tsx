/*
 * AI — Unscaled placeholder page
 * Content to be filled in later.
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function AiPage() {
  useEffect(() => {
    document.title = "AI — Unscaled";
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: "oklch(0.98 0.008 85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "clamp(2.2rem, 8vw, 7rem)",
        paddingRight: "clamp(2.2rem, 8vw, 7rem)",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Back link */}
      <Link href="/">
        <span
          style={{
            position: "absolute",
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
          }}
        >
          ← Unscaled
        </span>
      </Link>

      {/* Category label */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px",
          letterSpacing: "0.22em",
          color: "oklch(0.55 0.22 270)",
          textTransform: "uppercase",
          marginBottom: "1.4rem",
          opacity: 0.8,
        }}
      >
        AI
      </span>

      {/* Title */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(3rem, 7vw, 7rem)",
          lineHeight: 0.92,
          letterSpacing: "0.04em",
          color: "oklch(0.12 0.008 60)",
          margin: 0,
          padding: 0,
        }}
      >
        Coming soon.
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
          letterSpacing: "0.015em",
          color: "oklch(0.50 0.010 65)",
          marginTop: "clamp(1rem, 2.5vw, 2rem)",
          marginBottom: 0,
          lineHeight: 1.6,
          maxWidth: "38ch",
        }}
      >
        Thoughts on intelligence, hardware limits,
        <br />
        and what lies beyond the benchmark.
      </p>

      {/* Hairline */}
      <div
        style={{
          width: "clamp(2rem, 4vw, 3.5rem)",
          height: "1px",
          background: "oklch(0.72 0.008 65)",
          marginTop: "clamp(2rem, 4vw, 3.5rem)",
        }}
      />

      {/* Domain stamp */}
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "8px",
          letterSpacing: "0.18em",
          color: "oklch(0.60 0.008 65)",
          marginTop: "clamp(0.9rem, 1.5vw, 1.3rem)",
          textTransform: "uppercase",
          opacity: 0.5,
        }}
      >
        unscaled.me / ai
      </span>

      {/* Decorative grain — subtle bottom-right dot cluster */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "40vw",
          height: "60vh",
          background:
            "radial-gradient(ellipse at 80% 80%, oklch(0.90 0.006 65 / 0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

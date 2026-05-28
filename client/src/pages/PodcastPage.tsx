/*
 * Podcast Page — Unscaled
 * 《刻度之外 | Unscaled》— The observer's freedom
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function PodcastPage() {
  useEffect(() => {
    document.title = "Podcast — Unscaled";
  }, []);

  // Current podcast link
  const podcastUrl = "https://unscaled.podcast.xyz";

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
        paddingTop: "clamp(8rem, 15vw, 12rem)",
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
            fontFamily: "var(--font-wordmark)",
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

      {/* Content container */}
      <div
        style={{
          width: "75%",
          maxWidth: "900px",
          textAlign: "center",
          marginBottom: "clamp(4rem, 8vw, 6rem)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "var(--font-wordmark)",
            fontWeight: 400,
            fontSize: "clamp(3rem, 7vw, 6.5rem)",
            lineHeight: 0.92,
            letterSpacing: "0.04em",
            color: "oklch(0.12 0.008 60)",
            margin: "0 0 clamp(1.5rem, 3vw, 2.5rem) 0",
            padding: 0,
          }}
        >
          Unscaled
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)",
            letterSpacing: "0.015em",
            color: "oklch(0.50 0.010 65)",
            lineHeight: 1.7,
            margin: "0 0 clamp(2.5rem, 5vw, 4rem) 0",
          }}
        >
          Beyond the Scale
        </p>

        {/* Hairline */}
        <div
          style={{
            width: "clamp(2rem, 4vw, 3.5rem)",
            height: "1px",
            background: "oklch(0.72 0.008 65)",
            margin: "0 auto clamp(2.5rem, 5vw, 4rem)",
          }}
        />

        {/* English content */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            lineHeight: 1.85,
            color: "oklch(0.35 0.008 60)",
            letterSpacing: "0.01em",
            marginBottom: "clamp(3.5rem, 7vw, 5.5rem)",
            textAlign: "left",
          }}
        >
          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Core Stance: The Observer's Freedom</strong>
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            In today's AI discourse, everyone speaks of scale, parameters, and
            computational abundance. As a co-founder of an AI inference hardware
            company, if I only discussed benchmarks, process nodes, and
            throughput—the metrics "within the scale"—I would sound like a
            salesman reading from a script.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            "Unscaled" represents the freedom of an observer. In semiconductors,
            scale is process technology; in art, scale is proportion. Because we
            understand hardware's limits intimately, we earn the right to speak
            of what lies beyond—the soul of a product, the tension of creation,
            and the shifts in paradigm that transcend mere technical
            specifications.
          </p>

          <p style={{ marginBottom: "clamp(3.5rem, 7vw, 5.5rem)" }}>
            "Unscaled" refuses to be confined. It carries the hardness of
            foundational hardware and the lightness of the observer's
            perspective.
          </p>
        </div>

        {/* Hairline separator */}
        <div
          style={{
            width: "clamp(2rem, 4vw, 3.5rem)",
            height: "1px",
            background: "oklch(0.72 0.008 65)",
            margin: "0 auto clamp(2.5rem, 5vw, 4rem)",
          }}
        />

        {/* CTA Button */}
        <a
          href={podcastUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.75rem, 1rem, 0.9rem)",
            letterSpacing: "0.12em",
            color: "oklch(0.12 0.008 60)",
            backgroundColor: "transparent",
            textTransform: "uppercase",
            padding: "0.5rem 0",
            border: "none",
            borderBottom: "1px solid oklch(0.12 0.008 60)",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.3s ease",
            marginTop: "clamp(1rem, 2vw, 1.5rem)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.98 0.008 85)";
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "oklch(0.12 0.008 60)";
            (e.currentTarget as HTMLElement).style.transform =
              "translateX(2px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.12 0.008 60)";
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
            (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
          }}
        >
          Listen Now →
        </a>
      </div>

      {/* Domain stamp */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          letterSpacing: "0.18em",
          color: "oklch(0.60 0.008 65)",
          textTransform: "uppercase",
          opacity: 0.4,
          marginTop: "auto",
          paddingBottom: "2rem",
        }}
      >
        unscaled.me / podcast
      </span>

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

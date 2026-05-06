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

  // Current podcast link (replace with actual URL when available)
  const podcastUrl = "https://podcast.unscaled.me";

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: "oklch(0.98 0.008 85)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "clamp(2.2rem, 8vw, 7rem)",
        paddingRight: "clamp(2.2rem, 8vw, 7rem)",
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

      {/* Content container */}
      <div
        style={{
          maxWidth: "70ch",
          textAlign: "center",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: "oklch(0.12 0.008 60)",
            margin: "0 0 clamp(2rem, 4vw, 3rem) 0",
            padding: 0,
          }}
        >
          Unscaled
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
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

        {/* Chinese content */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            lineHeight: 1.8,
            color: "oklch(0.35 0.008 60)",
            letterSpacing: "0.01em",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            textAlign: "left",
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>《刻度之外 | Unscaled》</strong>
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            <strong>核心立场：观测者的自由</strong>
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            在目前的 AI 语境下，所有人都在谈论规模、参数、算力堆砌。作为一名AI推理硬件公司的联创，如果只谈论"刻度之内"的跑分、制程与吞吐量，那更像是一个推销员的自白。
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            "刻度之外"代表的是一种观测者的自由，在芯片领域，Scale 是工艺制程；在艺术领域，Scale 是比例。因为深知硬件的极限（Scale），所以更有资格谈论跳出硬件与技术之后的产品灵魂、艺术张力与变局。
          </p>

          <p style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
            "刻度之外"拒绝被定义，既有底层硬件的坚硬，又有观测者视角的轻盈。
          </p>
        </div>

        {/* English content */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            lineHeight: 1.8,
            color: "oklch(0.35 0.008 60)",
            letterSpacing: "0.01em",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            textAlign: "left",
          }}
        >
          <p style={{ marginBottom: "1.5rem" }}>
            <strong>Core Stance: The Observer's Freedom</strong>
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            In today's AI discourse, everyone speaks of scale, parameters, and computational abundance. As a co-founder of an AI inference hardware company, if I only discussed benchmarks, process nodes, and throughput—the metrics "within the scale"—I would sound like a salesman reading from a script.
          </p>

          <p style={{ marginBottom: "1.5rem" }}>
            "Unscaled" represents the freedom of an observer. In semiconductors, scale is process technology; in art, scale is proportion. Because we understand hardware's limits intimately, we earn the right to speak of what lies beyond—the soul of a product, the tension of creation, and the shifts in paradigm that transcend mere technical specifications.
          </p>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            "Unscaled" refuses to be confined. It carries the hardness of foundational hardware and the lightness of the observer's perspective.
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
            fontFamily: "'Space Mono', monospace",
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
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color =
              "oklch(0.98 0.008 85)";
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "oklch(0.12 0.008 60)";
            (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
          }}
          onMouseLeave={(e) => {
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
          fontFamily: "'Space Mono', monospace",
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

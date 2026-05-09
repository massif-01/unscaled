/*
 * AI — Unscaled page
 * Curated collection of AI experiments, benchmarks, and thoughts.
 */

import { useEffect } from "react";
import { Link } from "wouter";

interface AIItem {
  title: string;
  description: string;
  url: string;
  category: string;
}

const aiItems: AIItem[] = [
  {
    title: "Qwen 3.6 Benchmark Explorer",
    description:
      "Performance comparison across 12 AI evaluation sets. Qwen3.6-27B vs mainstream models on agentic coding, reasoning, and multimodal tasks.",
    url: "https://qwen.unscaled.me",
    category: "Benchmark",
  },
  {
    title: "Daily Stock Analysis",
    description:
      "LLM-powered intelligent stock analyzer for A/H/US markets. Automated decision dashboards with multi-dimensional analysis: technical patterns, real-time quotes, fund flows, news sentiment, and AI-driven insights. Supports 11 built-in strategies, backtesting, and multi-channel notifications via WeChat, Feishu, Telegram, Discord, Slack, and email. Zero-cost execution on GitHub Actions or Docker.",
    url: "/ai/daily-stock-analysis",
    category: "Quant",
  },
  {
    title: "AuraCap",
    description:
      "The first open-source project using GitHub Release as transient middleware. iOS Shortcuts capture screenshots/recordings → Release Assets → GitHub Actions AI processing → structured Markdown timeline. Zero infrastructure cost, zero webhooks, zero S3. Fork the repo, configure AI secrets, deploy instantly. Your data stays within GitHub's security boundary.",
    url: "/ai/auracap",
    category: "Knowledge",
  },
  {
    title: "ChatRaw",
    description:
      "Ultra-minimal AI chat UI: 30-second Docker deployment, zero registration, OpenAI-compatible. Supports any model (Ollama, vLLM, LocalAI, LM Studio). Multi-model configuration, document parsing, vision AI, thinking mode, plugin ecosystem. Lightweight (60MB), responsive design, perfect Lighthouse scores.",
    url: "/ai/chatraw",
    category: "Interface",
  },
];

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
        justifyContent: "flex-start",
        paddingLeft: "clamp(2.2rem, 8vw, 7rem)",
        paddingRight: "clamp(2.2rem, 8vw, 7rem)",
        paddingTop: "clamp(3rem, 6vw, 5rem)",
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
          marginTop: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        AI
      </span>

      {/* Title */}
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 700,
          fontSize: "clamp(3rem, 7vw, 6.5rem)",
          lineHeight: 0.92,
          letterSpacing: "0.04em",
          color: "oklch(0.12 0.008 60)",
          margin: 0,
          padding: 0,
          marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        Experiments.
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
          letterSpacing: "0.015em",
          color: "oklch(0.50 0.010 65)",
          lineHeight: 1.6,
          maxWidth: "42ch",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        Observations on model performance, hardware limits, and the space
        between signal and noise.
      </p>

      {/* Hairline */}
      <div
        style={{
          width: "clamp(2rem, 4vw, 3.5rem)",
          height: "1px",
          background: "oklch(0.72 0.008 65)",
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
        }}
      />

      {/* AI Items List */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(2rem, 4vw, 3.5rem)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        {aiItems.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: 0.9,
              paddingBottom: "1.5rem",
              borderBottom: "1px solid oklch(0.88 0.006 65)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform =
                "translateX(8px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = "0.9";
              (e.currentTarget as HTMLElement).style.transform =
                "translateX(0)";
            }}
            onClick={e => {
              if (item.url.startsWith("/")) {
                e.preventDefault();
                window.location.href = item.url;
              }
            }}
          >
            {/* Category badge */}
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.20em",
                color: "oklch(0.55 0.22 270)",
                textTransform: "uppercase",
                marginBottom: "0.6rem",
                display: "inline-block",
                opacity: 0.7,
              }}
            >
              {item.category}
            </span>

            {/* Item title */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                lineHeight: 1.15,
                letterSpacing: "0.02em",
                color: "oklch(0.12 0.008 60)",
                margin: "0.5rem 0 0.8rem 0",
                padding: 0,
              }}
            >
              {item.title}
            </h2>

            {/* Item description */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                letterSpacing: "0.01em",
                color: "oklch(0.50 0.010 65)",
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "55ch",
              }}
            >
              {item.description}
            </p>
          </a>
        ))}
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
        unscaled.me / ai
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

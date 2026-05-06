/*
 * Daily Stock Analysis Article — Unscaled
 * Deep dive into LLM-powered quantitative analysis
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function DailyStockAnalysisArticle() {
  useEffect(() => {
    document.title = "Daily Stock Analysis — Unscaled";
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
      <Link href="/ai">
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
          ← AI
        </span>
      </Link>

      {/* Article content */}
      <div
        style={{
          width: "100%",
          marginTop: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 0.95,
            letterSpacing: "0.04em",
            color: "oklch(0.12 0.008 60)",
            margin: 0,
            padding: 0,
            marginBottom: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          Daily Stock Analysis
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
            margin: "0 0 clamp(2rem, 4vw, 3rem) 0",
          }}
        >
          Intelligent stock analysis powered by large language models. Automated decision dashboards for global markets.
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

        {/* Article body */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            lineHeight: 1.8,
            color: "oklch(0.35 0.008 60)",
            letterSpacing: "0.01em",
          }}
        >
          <p style={{ marginBottom: "1.8rem" }}>
            In the age of information overload, stock market analysis has become increasingly complex. Traditional approaches struggle to synthesize real-time quotes, technical patterns, news sentiment, and fundamental metrics into coherent investment decisions. <strong>Daily Stock Analysis</strong> reimagines this workflow through the lens of artificial intelligence.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            Built on large language models, this system automates the daily ritual of market surveillance across A-shares, Hong Kong stocks, and US equities. Rather than drowning in data, investors receive a crystalline <strong>decision dashboard</strong>—a one-sentence thesis, a conviction score, precise entry/exit levels, risk alerts, and an actionable checklist. The system distills chaos into clarity.
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
              color: "oklch(0.12 0.008 60)",
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.2rem",
            }}
          >
            Multi-Dimensional Intelligence
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            The analysis engine integrates multiple data streams: technical indicators, real-time market microstructure, chip distribution patterns, news sentiment, earnings guidance, capital flows, and macroeconomic fundamentals. Each dimension feeds into the AI's reasoning, creating a holistic view that no single metric can provide. The system doesn't just report—it synthesizes, weighs, and decides.
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
              color: "oklch(0.12 0.008 60)",
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.2rem",
            }}
          >
            Built-In Strategy Arsenal
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            Eleven quantitative strategies are embedded into the system: moving average crossovers, Chan theory, Elliott waves, regime detection, emotional cycles, and more. Rather than forcing a one-size-fits-all approach, the AI selects and applies strategies contextually. A trending market calls for momentum; a mean-reverting market demands oscillator wisdom. The system adapts.
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
              color: "oklch(0.12 0.008 60)",
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.2rem",
            }}
          >
            Zero-Cost Automation
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            Deployment is frictionless. Run it on GitHub Actions—no server required, no monthly bills. The system executes on schedule, analyzing your watchlist every trading day at 6 PM Beijing time. Results flow through your preferred channels: WeChat, Feishu, Telegram, Discord, Slack, or email. The infrastructure disappears; only insights remain.
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
              color: "oklch(0.12 0.008 60)",
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
              marginBottom: "1.2rem",
            }}
          >
            Backtesting & Verification
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            Every analysis is testable. The system generates historical reports and validates past recommendations against actual market outcomes. Accuracy rates and simulated returns are transparent. This isn't black-box magic—it's auditable intelligence. You can see where the system succeeded and where it stumbled.
          </p>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            In a world of noise, <strong>Daily Stock Analysis</strong> is a signal generator. It transforms raw market data into actionable intelligence, powered by the reasoning capacity of large language models. For traders, portfolio managers, and serious investors, it's a tool that scales human judgment across global markets, every single day.
          </p>

          {/* CTA Button */}
          <a
            href="https://github.com/ZhuLinsen/daily_stock_analysis"
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
            View on GitHub →
          </a>
        </div>
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
        unscaled.me / ai / daily-stock-analysis
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

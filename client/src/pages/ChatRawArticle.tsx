/*
 * ChatRaw Article — Unscaled
 * Ultra-minimal AI chat UI: 30 seconds to deploy, zero friction, infinite possibilities
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function ChatRawArticle() {
  useEffect(() => {
    document.title = "ChatRaw — Unscaled";
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
          ChatRaw
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
          Ultra-minimal AI chat UI: 30 seconds to deploy, zero friction, infinite possibilities.
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
            Most AI chat interfaces are bloated. They demand sign-ups, enforce brand identity, lock you into ecosystems, and ship with features you'll never use. <strong>ChatRaw</strong> exists to obliterate that friction. It is a minimal, production-ready chat interface that deploys in thirty seconds, works with any OpenAI-compatible API, and gets out of your way.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            Whether you're a developer showcasing a model, an AI hardware vendor demonstrating device capabilities, a researcher experimenting with RAG and embeddings, or an enterprise building internal tools—ChatRaw is the interface that doesn't get in the way. It is fast, lightweight, and extensible. It is designed for people who value clarity over complexity.
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
            Core Philosophy: Lightweight, Fast, Extensible
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            ChatRaw runs on approximately 60MB of memory. It starts in seconds. It supports any OpenAI-compatible API—whether that's OpenAI itself, Ollama running locally, vLLM, LocalAI, LM Studio, or any other provider. There is no lock-in. There is no vendor dependency. You own your deployment. The interface is bilingual (English and Chinese with one-click switching), responsive across desktop, tablet, and mobile, and customizable. You can rebrand the entire experience—change the name, logo, avatar, subtitle, and theme colors—without touching code.
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
            Core Features
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Multi-Model Configuration:</strong> Support unlimited chat, embedding, and reranking models. Rotate API keys automatically to bypass rate limits. Built-in endpoint validation and testing.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Document & Image Support:</strong> Upload PDFs, DOCX, TXT, or Markdown files as chat context. The AI reads and references document content. Attach images for multimodal understanding. Images are automatically compressed to WebP format (~2MB).
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Thinking Mode:</strong> Support for reasoning models like DeepSeek-R1, Qwen, and o1. Deep reasoning is displayed in a collapsible thought process panel, keeping the interface clean while preserving transparency.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>One-Click Copy:</strong> Copy AI responses instantly. Text only, no metadata, no formatting cruft.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Custom Branding:</strong> Customize application name, logo, subtitle, avatar, and theme colors through the settings interface. Your interface, your brand.
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
            The Plugin Ecosystem
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            ChatRaw ships with a complete plugin system. The core is minimal; the ecosystem is infinite. Official plugins include Lightweight RAG Demo for knowledge base retrieval, Web Search Plugins (Bocha Search, Tavily Search, Enhanced Web Parsing), Data Parsers (Excel, CSV, TSV), Markdown Renderer Plus (Math, Mermaid, code copy), Context Compressor, and Multi-Model Manager. Plugins can extend the toolbar with custom buttons, overflow menus for many buttons, and fullscreen modals for complex interactions. The plugin development API is rich and well-documented. One-click packaging and distribution. Community-driven.
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
            Deployment: 30 Seconds
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            Docker is the recommended path. Pull the image, run the container, and you're live. Access the interface at <code>http://localhost:51111</code>. Configure your API endpoint and model in Settings. Start chatting. That's it. Alternatively, clone the repository and run from source (Python 3.12+). Or use docker-compose for LAN access to local services.
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
            Performance & Polish
          </h2>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            ChatRaw achieves perfect Lighthouse scores on desktop (Performance 100, Accessibility 100, Best Practices 100, SEO 100) and near-perfect on mobile (Performance 96, Accessibility 93). The interface is responsive, touch-friendly, and optimized for every screen size. The experience is smooth, the interactions are instant, and the design is intentional. ChatRaw is for anyone who believes that great tools should be simple, fast, and get out of your way. It is a rebellion against bloat. It is a statement that you can build powerful, flexible systems without complexity. It is the chat interface for people who value substance over spectacle.
          </p>

          {/* CTA Button */}
          <a
            href="https://github.com/massif-01/ChatRaw"
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
        unscaled.me / ai / chatraw
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

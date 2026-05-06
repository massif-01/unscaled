import { useEffect } from "react";

export default function ChatRawArticle() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "oklch(0.98 0.008 85)",
        color: "oklch(0.12 0.008 60)",
        fontFamily: "'Cormorant Garamond', serif",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
        lineHeight: 1.8,
      }}
    >
      {/* Back Link */}
      <a
        href="/ai"
        style={{
          display: "inline-block",
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.85rem",
          letterSpacing: "0.1em",
          color: "oklch(0.12 0.008 60)",
          textDecoration: "none",
          marginBottom: "clamp(2rem, 4vw, 3rem)",
          transition: "opacity 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.6";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "1";
        }}
      >
        ← Back to AI
      </a>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            marginBottom: "clamp(1rem, 2vw, 1.5rem)",
            lineHeight: 1.2,
          }}
        >
          ChatRaw
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            fontStyle: "italic",
            color: "oklch(0.12 0.008 60)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            opacity: 0.8,
          }}
        >
          Ultra-minimal AI chat UI: 30 seconds to deploy, zero friction, infinite possibilities.
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "oklch(0.12 0.008 60)",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
            letterSpacing: "0.01em",
          }}
        >
          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Most AI chat interfaces are bloated. They demand sign-ups, enforce brand identity, lock you into ecosystems, and ship with features you'll never use. <strong>ChatRaw</strong> exists to obliterate that friction. It is a minimal, production-ready chat interface that deploys in thirty seconds, works with any OpenAI-compatible API, and gets out of your way.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Whether you're a developer showcasing a model, an AI hardware vendor demonstrating device capabilities, a researcher experimenting with RAG and embeddings, or an enterprise building internal tools—ChatRaw is the interface that doesn't get in the way. It is fast, lightweight, and extensible. It is designed for people who value clarity over complexity.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Core Philosophy: Lightweight, Fast, Extensible
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            ChatRaw runs on approximately 60MB of memory. It starts in seconds. It supports any OpenAI-compatible API—whether that's OpenAI itself, Ollama running locally, vLLM, LocalAI, LM Studio, or any other provider. There is no lock-in. There is no vendor dependency. You own your deployment.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            The interface is bilingual (English and Chinese with one-click switching), responsive across desktop, tablet, and mobile, and customizable. You can rebrand the entire experience—change the name, logo, avatar, subtitle, and theme colors—without touching code. Settings are saved locally. No registration. No tracking. No telemetry.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Core Features
          </h2>

          <p style={{ marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
            <strong>Multi-Model Configuration</strong> — Support unlimited chat, embedding, and reranking models. Rotate API keys automatically to bypass rate limits. Built-in endpoint validation and testing.
          </p>

          <p style={{ marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
            <strong>Document & Image Support</strong> — Upload PDFs, DOCX, TXT, or Markdown files as chat context. The AI reads and references document content. Attach images for multimodal understanding. Images are automatically compressed to WebP format (~2MB).
          </p>

          <p style={{ marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
            <strong>Thinking Mode</strong> — Support for reasoning models like DeepSeek-R1, Qwen, and o1. Deep reasoning is displayed in a collapsible thought process panel, keeping the interface clean while preserving transparency.
          </p>

          <p style={{ marginBottom: "clamp(1rem, 1.5vw, 1.5rem)" }}>
            <strong>One-Click Copy</strong> — Copy AI responses instantly. Text only, no metadata, no formatting cruft.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            <strong>Custom Branding</strong> — Customize application name, logo, subtitle, avatar, and theme colors through the settings interface. Your interface, your brand.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            The Plugin Ecosystem
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            ChatRaw ships with a complete plugin system. The core is minimal; the ecosystem is infinite. Official plugins include:
          </p>

          <ul style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)", paddingLeft: "2rem" }}>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Lightweight RAG Demo</strong> — Knowledge base retrieval
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Web Search Plugins</strong> — Bocha Search, Tavily Search, Enhanced Web Parsing (browser, Firecrawl, Jina)
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Data Parsers</strong> — Excel, CSV, and TSV parsing for chat context
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Markdown Renderer Plus</strong> — Math (KaTeX), Mermaid diagrams, code copy, offline rendering
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Context Compressor</strong> — Automatically compact older chat history or compress manually from the toolbar
            </li>
            <li style={{ marginBottom: "0.8rem" }}>
              <strong>Multi-Model Manager</strong> — Manage and switch between models seamlessly
            </li>
          </ul>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Plugins can extend the toolbar with custom buttons, overflow menus for many buttons, and fullscreen modals for complex interactions. The plugin development API is rich and well-documented. One-click packaging and distribution. Community-driven.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Deployment: 30 Seconds
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Docker is the recommended path. Pull the image, run the container, and you're live:
          </p>

          <pre
            style={{
              backgroundColor: "oklch(0.95 0.005 85)",
              padding: "1rem",
              borderRadius: "0.25rem",
              overflow: "auto",
              marginBottom: "clamp(1.5rem, 2vw, 2rem)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.9rem",
            }}
          >
            {`docker pull massif01/chatraw:latest
docker run -d -p 51111:51111 \\
  -v chatraw-data:/app/data \\
  massif01/chatraw:latest`}
          </pre>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Access the interface at <code style={{ fontFamily: "'Space Mono', monospace" }}>http://localhost:51111</code>. Configure your API endpoint and model in Settings. Start chatting. That's it.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Alternatively, clone the repository and run from source (Python 3.12+). Or use docker-compose for LAN access to local services.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Performance & Polish
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            ChatRaw achieves perfect Lighthouse scores on desktop (Performance 100, Accessibility 100, Best Practices 100, SEO 100) and near-perfect on mobile (Performance 96, Accessibility 93). The interface is responsive, touch-friendly, and optimized for every screen size. The experience is smooth, the interactions are instant, and the design is intentional.
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 2vw, 1.8rem)",
              fontWeight: 400,
              marginTop: "clamp(2rem, 3vw, 2.5rem)",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Who This Is For
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            Developers who want to showcase their models without building UI. AI hardware vendors who need a ready-to-use interface to demonstrate device capabilities. Researchers experimenting with RAG, embeddings, and reranking. Students learning AI applications hands-on. Enterprises building internal tools and knowledge bases.
          </p>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            ChatRaw is for anyone who believes that great tools should be simple, fast, and get out of your way. It is a rebellion against bloat. It is a statement that you can build powerful, flexible systems without complexity. It is the chat interface for people who value substance over spectacle.
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
    </div>
  );
}

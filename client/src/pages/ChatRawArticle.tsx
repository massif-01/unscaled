import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function ChatRawArticle() {
  useEffect(() => {
    document.title = "ChatRaw — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="ChatRaw"
      summary="A local-first AI client that keeps conversations private, portable, and under your control."
      category="AI interface"
      repository="https://github.com/massif-01/ChatRaw"
    >
          <p style={{ marginBottom: "1.8rem" }}>
            Most AI chat interfaces are bloated. They demand sign-ups, enforce
            brand identity, lock you into ecosystems, and ship with features
            you'll never use. <strong>ChatRaw</strong> exists to obliterate that
            friction. It is a minimal, production-ready chat interface that
            deploys in thirty seconds, works with any OpenAI-compatible API, and
            gets out of your way.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            Whether you're a developer showcasing a model, an AI hardware vendor
            demonstrating device capabilities, a researcher experimenting with
            RAG and embeddings, or an enterprise building internal tools—ChatRaw
            is the interface that doesn't get in the way. It is fast,
            lightweight, and extensible. It is designed for people who value
            clarity over complexity.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
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
            ChatRaw runs on approximately 60MB of memory. It starts in seconds.
            It supports any OpenAI-compatible API—whether that's OpenAI itself,
            Ollama running locally, vLLM, LocalAI, LM Studio, or any other
            provider. There is no lock-in. There is no vendor dependency. You
            own your deployment. The interface is bilingual (English and Chinese
            with one-click switching), responsive across desktop, tablet, and
            mobile, and customizable. You can rebrand the entire
            experience—change the name, logo, avatar, subtitle, and theme
            colors—without touching code.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
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
            <strong>Multi-Model Configuration:</strong> Support unlimited chat,
            embedding, and reranking models. Rotate API keys automatically to
            bypass rate limits. Built-in endpoint validation and testing.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Document & Image Support:</strong> Upload PDFs, DOCX, TXT,
            or Markdown files as chat context. The AI reads and references
            document content. Attach images for multimodal understanding. Images
            are automatically compressed to WebP format (~2MB).
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Thinking Mode:</strong> Support for reasoning models like
            DeepSeek-R1, Qwen, and o1. Deep reasoning is displayed in a
            collapsible thought process panel, keeping the interface clean while
            preserving transparency.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>One-Click Copy:</strong> Copy AI responses instantly. Text
            only, no metadata, no formatting cruft.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Custom Branding:</strong> Customize application name, logo,
            subtitle, avatar, and theme colors through the settings interface.
            Your interface, your brand.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
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
            ChatRaw ships with a complete plugin system. The core is minimal;
            the ecosystem is infinite. Official plugins include Lightweight RAG
            Demo for knowledge base retrieval, Web Search Plugins (Bocha Search,
            Tavily Search, Enhanced Web Parsing), Data Parsers (Excel, CSV,
            TSV), Markdown Renderer Plus (Math, Mermaid, code copy), Context
            Compressor, and Multi-Model Manager. Plugins can extend the toolbar
            with custom buttons, overflow menus for many buttons, and fullscreen
            modals for complex interactions. The plugin development API is rich
            and well-documented. One-click packaging and distribution.
            Community-driven.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
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
            Docker is the recommended path. Pull the image, run the container,
            and you're live. Access the interface at{" "}
            <code>http://localhost:51111</code>. Configure your API endpoint and
            model in Settings. Start chatting. That's it. Alternatively, clone
            the repository and run from source (Python 3.12+). Or use
            docker-compose for LAN access to local services.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
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
            ChatRaw achieves perfect Lighthouse scores on desktop (Performance
            100, Accessibility 100, Best Practices 100, SEO 100) and
            near-perfect on mobile (Performance 96, Accessibility 93). The
            interface is responsive, touch-friendly, and optimized for every
            screen size. The experience is smooth, the interactions are instant,
            and the design is intentional. ChatRaw is for anyone who believes
            that great tools should be simple, fast, and get out of your way. It
            is a rebellion against bloat. It is a statement that you can build
            powerful, flexible systems without complexity. It is the chat
            interface for people who value substance over spectacle.
          </p>
    </ArticlePage>
  );
}

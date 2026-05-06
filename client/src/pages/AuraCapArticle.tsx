import { useEffect } from "react";

export default function AuraCapArticle() {
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
          AuraCap
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
          Turn every screenshot and recording into traceable, reusable long-term assets.
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
            In the age of information fragmentation, most of us face a fundamental paradox: we capture countless moments—screenshots, voice notes, photos—but rarely transform them into lasting knowledge. The moment passes, the context fades, and what once seemed important becomes noise in the archive.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            <strong>AuraCap</strong> reimagines this workflow. It is the first open-source project to use GitHub Release as a transient middleware—a radical rethinking of how we move data through systems without paying for infrastructure. iOS Shortcuts capture screenshots or recordings and upload them to Release Assets. GitHub Actions automatically retrieves, processes via AI, and writes structured insights to a timeline. The entire loop closes within GitHub's security boundary. No S3. No image hosting. No exposed webhooks. No server bills.
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
            The Architecture: GitHub Release as Temporary Object Storage
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            The design philosophy is deceptively elegant. Rather than treating Release as a static artifact repository, AuraCap treats it as authenticated temporary object storage. When you capture a screenshot on iOS, the shortcut uploads it to a dedicated Inbox Release via the GitHub API. GitHub returns a unique <code style={{ fontFamily: "'Space Mono', monospace" }}>asset_id</code>. The shortcut then triggers a workflow dispatch with only this ID—no need to transmit the entire file.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            GitHub Actions has built-in permission to fetch Release Assets via <code style={{ fontFamily: "'Space Mono', monospace" }}>GITHUB_TOKEN</code>. The processing pipeline downloads the asset, runs it through your chosen LLM (OpenAI, Gemini, SiliconFlow, Anthropic, Groq, Mistral—any model you prefer), extracts structured insights, and writes everything to Markdown. The media flow never leaves GitHub's security boundary. Your data remains yours.
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
            What You Get
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            AuraCap produces multiple layers of structured output, all in Markdown:
          </p>

          <ul style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)", paddingLeft: "2rem" }}>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Timeline</strong> — A chronological record of every capture, with AI-extracted core information and semantic tags
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Daily Insights</strong> — Pattern detection across the day's captures, surfacing cross-entry connections and unfinished signals
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Weekly Summaries</strong> — Longitudinal analysis over time, tracing trajectories and generating actionable recommendations
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Task Index</strong> — Semantic tagging by weight, enabling quick navigation and task prioritization
            </li>
          </ul>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            All output is pure Markdown. This means it syncs seamlessly to Notion, Obsidian, or any knowledge management system. Your data structure is never locked into a platform. You can migrate, backup, and repurpose your captures indefinitely.
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
            Two Deployment Paths
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            <strong>GitHub-only mode</strong> (recommended for simplicity): Fork the repository, set it to Private, configure your AI model secrets, and you're done. Every screenshot or recording triggers the pipeline automatically. Zero server maintenance. Zero cost.
          </p>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            <strong>Self-hosted mode</strong> (for real-time control): Deploy the backend on your own server or local machine. iOS Shortcuts connect directly to your API. Responses are instant, and you maintain full control over the processing pipeline.
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
            Why This Matters
          </h2>

          <p style={{ marginBottom: "clamp(1.5rem, 2vw, 2rem)" }}>
            AuraCap solves a real problem: the gap between capture and consolidation. Most information systems force you to choose between speed (capture now, organize later) and control (organize as you go, but friction kills the habit). AuraCap eliminates that tradeoff. Capture is instant and frictionless. Organization is automatic and intelligent. And your data is always in your hands.
          </p>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            In a world of surveillance capitalism and platform lock-in, AuraCap is a quiet rebellion. It demonstrates that you can build powerful, AI-driven systems without surrendering your data to cloud vendors. GitHub becomes your infrastructure. Your captures become your assets. Your timeline becomes your memory.
          </p>

          {/* CTA Button */}
          <a
            href="https://github.com/massif-01/AuraCap"
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

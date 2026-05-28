/*
 * AuraCap Article — Unscaled
 * Turn every screenshot into traceable, reusable long-term assets
 */

import { useEffect } from "react";
import { Link } from "wouter";

export default function AuraCapArticle() {
  useEffect(() => {
    document.title = "AuraCap — Unscaled";
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
            fontFamily: "var(--font-mono)",
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
            fontFamily: "var(--font-display)",
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
          AuraCap
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            letterSpacing: "0.015em",
            color: "oklch(0.50 0.010 65)",
            lineHeight: 1.6,
            margin: "0 0 clamp(2rem, 4vw, 3rem) 0",
          }}
        >
          Turn every screenshot and recording into traceable, reusable long-term
          assets.
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
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            lineHeight: 1.8,
            color: "oklch(0.35 0.008 60)",
            letterSpacing: "0.01em",
          }}
        >
          <p style={{ marginBottom: "1.8rem" }}>
            In the age of information fragmentation, most of us face a
            fundamental paradox: we capture countless moments—screenshots, voice
            notes, photos—but rarely transform them into lasting knowledge. The
            moment passes, the context fades, and what once seemed important
            becomes noise in the archive. <strong>AuraCap</strong> reimagines
            this workflow.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            It is the first open-source project to use GitHub Release as a
            transient middleware—a radical rethinking of how we move data
            through systems without paying for infrastructure. iOS Shortcuts
            capture screenshots or recordings and upload them to Release Assets.
            GitHub Actions automatically retrieves, processes via AI, and writes
            structured insights to a timeline. The entire loop closes within
            GitHub's security boundary. No S3. No image hosting. No exposed
            webhooks. No server bills. Fork the repository, configure your AI
            model secrets, and deployment is complete. Zero infrastructure cost.
            Zero operational overhead.
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
            The Architecture: GitHub Release as Temporary Object Storage
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            The design philosophy is deceptively elegant. Rather than treating
            Release as a static artifact repository, AuraCap treats it as
            authenticated temporary object storage. When you capture a
            screenshot on iOS, the shortcut uploads it to a dedicated Inbox
            Release via the GitHub API. GitHub returns a unique{" "}
            <code>asset_id</code>. The shortcut then triggers a workflow
            dispatch with only this ID—no need to transmit the entire file.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            GitHub Actions has built-in permission to fetch Release Assets via{" "}
            <code>GITHUB_TOKEN</code>. The processing pipeline downloads the
            asset, runs it through your chosen LLM (OpenAI, Gemini, SiliconFlow,
            Anthropic, Groq, Mistral—any model you prefer), extracts structured
            insights, and writes everything to Markdown. The media flow never
            leaves GitHub's security boundary. Your data remains yours.
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
            What You Get
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            AuraCap produces multiple layers of structured output, all in
            Markdown: a chronological timeline of every capture with
            AI-extracted core information and semantic tags; daily insights
            surfacing cross-entry connections and unfinished signals; weekly
            summaries tracing trajectories and generating actionable
            recommendations; and a task index enabling semantic tagging and
            quick navigation. All output is pure Markdown, syncing seamlessly to
            Notion, Obsidian, or any knowledge management system. Your data
            structure is never locked into a platform.
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
            Two Deployment Paths
          </h2>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>GitHub-only mode</strong> (recommended for simplicity): Fork
            the repository, set it to Private, configure your AI model secrets,
            and you're done. Every screenshot or recording triggers the pipeline
            automatically. Zero server maintenance. Zero cost.
          </p>

          <p style={{ marginBottom: "1.8rem" }}>
            <strong>Self-hosted mode</strong> (for real-time control): Deploy
            the backend on your own server or local machine. iOS Shortcuts
            connect directly to your API. Responses are instant, and you
            maintain full control over the processing pipeline.
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
            Why This Matters
          </h2>

          <p style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
            AuraCap solves a real problem: the gap between capture and
            consolidation. Most information systems force you to choose between
            speed (capture now, organize later) and control (organize as you go,
            but friction kills the habit). AuraCap eliminates that tradeoff.
            Capture is instant and frictionless. Organization is automatic and
            intelligent. And your data is always in your hands. In a world of
            surveillance capitalism and platform lock-in, AuraCap is a quiet
            rebellion. It demonstrates that you can build powerful, AI-driven
            systems without surrendering your data to cloud vendors. GitHub
            becomes your infrastructure. Your captures become your assets. Your
            timeline becomes your memory.
          </p>

          {/* CTA Button */}
          <a
            href="https://github.com/massif-01/AuraCap"
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
              (e.currentTarget as HTMLElement).style.transform =
                "translateX(0)";
            }}
          >
            View on GitHub →
          </a>
        </div>
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
        unscaled.me / ai / auracap
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

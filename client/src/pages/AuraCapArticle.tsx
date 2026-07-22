import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function AuraCapArticle() {
  useEffect(() => {
    document.title = "AuraCap — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="AuraCap"
      summary="Turn every screenshot and recording into traceable, reusable long-term assets."
      category="Personal knowledge"
      repository="https://github.com/massif-01/AuraCap"
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
    </ArticlePage>
  );
}

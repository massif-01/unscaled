import { useEffect } from "react";
import { Link } from "wouter";
import { ArticlePage } from "@/components/SecondaryPage";

export default function AuraCapGleaningsArticle() {
  useEffect(() => {
    document.title = "AuraCap · Gleanings — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="AuraCap · Gleanings"
      summary="A memory plugin for DeepSeek Harness that helps you find what you saved when it matters again."
      category="Personal memory"
      repository="https://github.com/massif-01/dsh-auracap"
    >
      <p>
        You saved three screens of an article for a single sentence. Weeks
        later, you remember what that sentence meant, and have no idea where it
        lives. Gleanings gives those fragments a place in a timeline, keeps
        related captures together, and lets you retrieve them by subject as
        easily as by date.
      </p>
      <h2>Local-first capture &amp; multi-screen grouping</h2>
      <p>
        Gleanings runs inside DeepSeek Harness on your Mac (
        <code>~/.dsh/auracap/</code>), keeping your collection local while using
        DeepSeek only when a capture needs to be read or summarized.
      </p>
      <ul>
        <li>
          <strong>Multi-format inbox:</strong> Drag in images, PDFs, TXT, or
          Markdown files, clip directly from macOS screenshots, or send captures
          from an iPhone Shortcut (using GitHub purely as a free relay).
        </li>
        <li>
          <strong>Automatic screen grouping:</strong> Sequential screenshots
          from the same article are grouped into one card, ready to merge into a
          single summary, split apart, or re-group later.
        </li>
        <li>
          <strong>Four horizons of reflection:</strong> Captures roll up into
          daily insights and weekly, monthly, and yearly traces—each linked back
          to the original source captures.
        </li>
      </ul>
      <h2>Private by default, open to the agent when asked</h2>
      <p>
        The original{" "}
        <Link className="underline underline-offset-4" href="/ai/auracap">
          AuraCap
        </Link>{" "}
        pushed iPhone captures into a GitHub Markdown archive. Gleanings grew
        out of that workflow to put the archive and the conversation side by
        side. Its local HTTP surface listens strictly on <code>127.0.0.1</code>,
        and agent memory access is <strong>read-only and off by default</strong>
        —so a new conversation only looks up past captures when you explicitly
        turn it on.
      </p>
    </ArticlePage>
  );
}

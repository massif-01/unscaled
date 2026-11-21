import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function ChatRawArticle() {
  useEffect(() => {
    document.title = "ChatRaw — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="ChatRaw"
      summary="A quiet place to talk to the models you choose, with room for longer work when you need it."
      category="AI interface"
      repository="https://github.com/massif-01/ChatRaw"
    >
      <p>
        When trying a new model, you want to get straight to the first
        question—ask it to read a page of notes, then send the exact same prompt
        to another model to see what each one notices. ChatRaw puts those
        conversations in one quiet, zero-signup window, whether the model sits
        on your own machine (Ollama, vLLM, LocalAI, LM Studio) or behind an API
        key.
      </p>
      <h2>From web self-hosting to an Apple Silicon app</h2>
      <p>
        ChatRaw started as a lightweight web interface—deployable in{" "}
        <strong>30 seconds</strong>, running in roughly <strong>60 MB</strong>{" "}
        of memory, and scoring <strong>100/100/100/100</strong> on
        Lighthouse—and now includes a native macOS app (SwiftUI + WKWebView) for
        Apple Silicon that launches its <code>127.0.0.1</code> backend
        automatically and keeps your history on disk.
      </p>
      <ul>
        <li>
          <strong>Documents &amp; Vision:</strong> Built-in parsing for PDF,
          DOCX, TXT, and Markdown alongside image understanding.
        </li>
        <li>
          <strong>Reasoning models:</strong> Native support for thinking-mode
          traces across DeepSeek-R1, Qwen, and o1-style endpoints.
        </li>
        <li>
          <strong>Plugin &amp; adapter marketplace:</strong> Extensible with
          RAG, web parsing, and adapters for Hermes, Codex CLI, Claude Code, Pi,
          and DeepSeek Harness.
        </li>
      </ul>
      <h2>When a conversation turns into a task</h2>
      <p>
        A quick question often grows into work you want an agent to carry out.
        Connecting tools like Hermes or Codex CLI lets you follow task progress,
        answer prompts, or approve actions from the same interface—with setup
        guides for both Mac and self-hosted Linux in the repository.
      </p>
    </ArticlePage>
  );
}

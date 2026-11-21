import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function ThorustinferArticle() {
  useEffect(() => {
    document.title = "Thorustinfer — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="Thorustinfer"
      summary="Give a Jetson Thor a job as a local model server for the tools you already use."
      category="Local AI"
      repository="https://github.com/massif-01/Thorustinfer"
    >
      <p>
        A model can run on the machine next to your desk and still feel miles
        away. If reaching it means opening a one-off demo or switching clients,
        it never becomes part of your daily work. Thorustinfer turns a Jetson
        Thor (<code>aarch64</code>, SM110a) into a standalone{" "}
        <strong>Rust</strong> inference server—with{" "}
        <strong>zero Python or Conda runtime dependencies</strong>—that speaks
        directly to the chat and coding tools you already use.
      </p>
      <h2>OpenAI-compatible, built without Python</h2>
      <p>
        GPU kernels are pre-compiled into the execution bundle, while the Rust
        server handles request batching and state tracking in a minimal
        footprint.
      </p>
      <ul>
        <li>
          <strong>Standard API surface:</strong> Exposes{" "}
          <code>POST /v1/chat/completions</code> with streaming responses and
          tool calls for clients like OpenCode or Pi.
        </li>
        <li>
          <strong>Lightweight daemon:</strong> Idle manager footprint measures
          just{" "}
          <strong>
            <code>9.45 MiB</code>
          </strong>{" "}
          median RSS on a T5000.
        </li>
        <li>
          <strong>Shared target bundle:</strong> One SM110a engine package
          covers both T5000 and T4000 boards.
        </li>
      </ul>
      <h2>Benchmarked on Qwen3.5-4B</h2>
      <p>
        On a T5000 at 70W (single request, MTP off, post-warmup median for a
        2,048-token prompt and 48 generated tokens), Qwen3.5-4B finishes in{" "}
        <strong>
          <code>1.76 s</code>
        </strong>{" "}
        with native NVFP4 (<code>w4a4</code>) and{" "}
        <strong>
          <code>2.80 s</code>
        </strong>{" "}
        with <code>e8p</code>. The repository walks through preparing the model
        package, sending your first prompt, and wiring up local coding clients.
      </p>
    </ArticlePage>
  );
}

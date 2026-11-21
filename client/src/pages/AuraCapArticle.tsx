import { useEffect } from "react";
import { Link } from "wouter";
import { ArticlePage } from "@/components/SecondaryPage";

export default function AuraCapArticle() {
  useEffect(() => {
    document.title = "AuraCap — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="AuraCap"
      summary="Save a screenshot or recording in the moment and give yourself a way to find it later."
      category="Personal knowledge"
      repository="https://github.com/massif-01/AuraCap"
    >
      <p>
        You screenshot a passage on the train. Days later, you remember the
        idea, not what you were reading. AuraCap is built around the habit of
        capturing while a thought is fresh—and letting an automated pipeline
        handle the filing after you put your phone away.
      </p>
      <h2>Release as the relay: zero-server capture</h2>
      <p>
        Instead of asking you to maintain an S3 bucket, an image host, or a
        webhook proxy, AuraCap treats{" "}
        <strong>GitHub Release Assets as transient middleware</strong>:
      </p>
      <p>
        <code>
          iPhone Shortcut → GitHub Release inbox → GitHub Actions + AI → asset
          cleanup → Markdown/JSON archive
        </code>
      </p>
      <p>
        Once the workflow reads your screenshot or voice recording using your
        configured model (OpenAI, Gemini, Anthropic, SiliconFlow, Groq, or
        Mistral), it deletes the temporary upload and commits a clean record—so
        you can fork the repo and run it at zero server cost, or self-host via
        Docker.
      </p>
      <h2>Four layers of memory in your own repo</h2>
      <p>Every capture settles into an open file hierarchy you own outright:</p>
      <ul>
        <li>
          <strong>
            <code>timeline</code>:
          </strong>{" "}
          Atomic, chronological event records for each capture.
        </li>
        <li>
          <strong>
            <code>insights</code>:
          </strong>{" "}
          Short-cycle daily signals distilled from that day's notes.
        </li>
        <li>
          <strong>
            <code>summary</code>:
          </strong>{" "}
          Longitudinal threads across days and weeks when you remember a topic
          but lost the date.
        </li>
        <li>
          <strong>
            <code>task_index</code>:
          </strong>{" "}
          A semantic index layer built for future RAG and knowledge-graph
          queries.
        </li>
      </ul>
      <p>
        If you prefer keeping everything on a Mac inside DeepSeek Harness with
        multi-screen grouping, see its companion plugin,{" "}
        <Link className="underline underline-offset-4" href="/ai/dsh-auracap">
          AuraCap · Gleanings
        </Link>
        .
      </p>
    </ArticlePage>
  );
}

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
        You screenshot a passage on the train. A few days later, you remember
        the idea but can’t say what you were reading. I built AuraCap around
        the habit of taking the screenshot while the idea is fresh. The
        sorting can wait.
      </p>

      <h2>A short stop on the way to a record</h2>
      <p>
        An iPhone Shortcut sends the capture to a GitHub inbox. A workflow
        asks the model you configure to read the image or recording and
        writes the result to files in your repository. Once a capture has
        been processed, the uploaded copy is cleared from the inbox. What
        stays is a record you can open and read.
      </p>

      <h2>Something to come back to</h2>
      <p>
        The timeline puts each capture back in its day. Daily notes and weekly
        summaries give you another way in when you remember a topic but have
        lost track of the date. The repository walks through both the GitHub
        setup and a self-hosted option. There’s also a Mac plugin that grew
        out of this work,{" "}
        <Link className="underline underline-offset-4" href="/ai/dsh-auracap">
          AuraCap · Gleanings
        </Link>
        .
      </p>
    </ArticlePage>
  );
}

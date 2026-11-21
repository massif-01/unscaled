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
        You saved three screens of an article for one sentence. Weeks later,
        you remember what the sentence meant and have no idea where it is.
        Gleanings gives those screens a place in a timeline, keeps them
        together, and lets you find them by subject as well as by date.
      </p>

      <h2>Come back to a thought in the middle of your work</h2>
      <p>
        Gleanings lives inside DeepSeek Harness on your Mac. You can add a
        screenshot or document from the Mac, or send a capture from an iPhone.
        Open a weekly reflection and you can follow a thought back to the
        captures behind it. With your permission, the agent can look up a
        relevant memory from a new conversation, too.
      </p>

      <h2>From an archive to a place to look back</h2>
      <p>
        The{" "}
        <Link className="underline underline-offset-4" href="/ai/auracap">
          original AuraCap
        </Link>{" "}
        sent captures from an iPhone to a Markdown archive on GitHub.
        Gleanings grew out of that workflow and puts the archive and the
        conversation beside each other.
        It keeps your collection on the Mac and uses DeepSeek when a capture
        needs to be read or summarized. The repository shows the timeline,
        grouped captures, and reflections in use.
      </p>
    </ArticlePage>
  );
}

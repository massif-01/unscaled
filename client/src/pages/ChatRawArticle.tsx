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
        When I try a model, I want to get to the first question. I might ask
        it to read a page of notes, then send the same question to another
        model to see what each one picks up. ChatRaw gives those conversations
        one familiar window. You decide which service answers, whether it is
        a model on your own machine or an API you already use.
      </p>

      <h2>A window of its own</h2>
      <p>
        ChatRaw started as a web interface you could run yourself. There is
        now a desktop app for Apple silicon Macs. It opens in its own window
        and starts the local service for you. ChatRaw stores the history on
        the machine running the app. Your chosen model endpoint receives your
        prompts and the context you send with them.
      </p>

      <h2>When a conversation turns into a task</h2>
      <p>
        A question can grow into something you want an agent to work on.
        The Linux setup can connect tools such as Hermes or Codex CLI so you
        can follow a task, answer a question, or review an approval from the
        same interface. The repository shows how to start with a chat on your
        Mac or a self-hosted instance and where to go when you want to try an
        agent.
      </p>
    </ArticlePage>
  );
}

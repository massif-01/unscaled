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
        A model can run on the machine next to your desk and still feel far
        away. If reaching it means opening a special demo or switching clients,
        it stays outside the work you do each day. Thorustinfer gives a Jetson
        Thor an address your existing chat and coding tools can talk to.
      </p>

      <h2>Keep the client you know</h2>
      <p>
        You can point a chat client at the machine on your desk or give a coding
        tool such as OpenCode or Pi a local model to work with. Replies can
        stream as they arrive, and models with tool support can use the tools
        the client offers. The server can load a model when a request needs it.
      </p>

      <h2>From a first reply to a tool you use</h2>
      <p>
        You need a prepared model package that matches Thor. The repository
        shows how to send a first prompt and includes configurations for two
        coding clients. Start there if you have a board on your desk and a tool
        you would like to point at it.
      </p>
    </ArticlePage>
  );
}

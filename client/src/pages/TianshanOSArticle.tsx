import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function TianshanOSArticle() {
  useEffect(() => {
    document.title = "TianshanOS — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="TianshanOS"
      summary="A way to check on an RM-01 and bring it back when its hosts stop answering."
      category="Hardware management"
      repository="https://github.com/RMinte/TianshanOS"
    >
      <p>
        A long inference run goes quiet. The machine stops answering over SSH,
        and you are far from the power button. The first question is whether
        the machine is still on. TianshanOS gives the RM-01 a separate way to
        answer even when one of its hosts has stopped responding.
      </p>

      <h2>A view from outside the host</h2>
      <p>
        While the management controller has power and its network connection,
        you can open the browser console to check the inference and application
        hosts, read temperatures, and see how the fans are running. If a host
        needs a reset, you can reach the hardware controls from the same place.
        Those readings also help on an ordinary day, when the machine is up and
        you want to know how it is handling a long job.
      </p>

      <h2>Working on the console</h2>
      <p>
        TianshanOS is a project from RMinte. I contributed to its browser
        console and cooling controls. The repository is a good place to see
        what the controller can show you, from a host’s power state to the
        temperature you want to keep an eye on.
      </p>
    </ArticlePage>
  );
}

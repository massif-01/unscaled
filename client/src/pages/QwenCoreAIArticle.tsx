import { useEffect } from "react";
import { ArticlePage } from "@/components/SecondaryPage";

export default function QwenCoreAIArticle() {
  useEffect(() => {
    document.title = "Qwen3-1.7B on iPhone — Unscaled";
  }, []);

  return (
    <ArticlePage
      title="Qwen3-1.7B on iPhone"
      summary="What it took to put a small language model to work on the phone that holds the data."
      category="On-device AI"
      repository="https://github.com/massif-01/qwen3-1.7b-coreai-ios"
    >
      <p>
        A note can hold a date, an address, or a promise you meant to keep. A
        language model can help pull out the detail you need. When the note is
        private, it matters where that reading happens. This project began with
        that question while building the on-device privacy engine for e¹.
      </p>

      <h2>What the smaller model kept</h2>
      <p>
        Fitting Qwen3-1.7B on a phone meant making the model smaller and checking
        what it lost along the way. Several candidates strayed too far from how
        the source model predicted text. We settled on a version that stayed
        close in those checks, then recorded it generating text on an iPhone 15
        Pro running iOS 27.
      </p>

      <h2>A starting point for your own app</h2>
      <p>
        If you want an app to extract a detail from a note or answer a short
        question over text on the device, the repository gives you a place to
        begin. Mengni Wu and I documented the choices, the checks, and the
        device we used. The repository also links to the model bundle you can
        download.
      </p>
    </ArticlePage>
  );
}

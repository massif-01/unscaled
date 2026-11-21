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
        language model can pull that detail out for you—and when the note is
        private, where that reading happens matters. This project explores what
        it takes to run that inference entirely on the phone itself.
      </p>
      <h2>W8 palettization &amp; fidelity checks</h2>
      <p>
        Fitting <code>Qwen/Qwen3-1.7B</code> onto an iPhone meant shrinking the
        weights without breaking how the model reasons. Aggressive 4-bit
        candidates drifted too far from the source distribution. What held up on
        the A17 Pro Neural Engine (<code>h16p</code> AOT specialization) was{" "}
        <strong>W8 per-tensor K-means palettization</strong> for transformer
        projections, <strong>INT8</strong> for the tied embedding, and{" "}
        <strong>FP16</strong> compute with a fixed <strong>4,096-token</strong>{" "}
        KV Cache (<code>448 MiB</code>).
      </p>
      <ul>
        <li>
          <strong>Fidelity-v2 held-out check:</strong> <code>0.996897</code>{" "}
          mean logits cosine similarity and <code>96.97%</code> Top-1 agreement
          (<code>98.96%</code> on the tuning set).
        </li>
        <li>
          <strong>On-device memory:</strong> <code>2,963.7 MiB</code> peak
          resident memory on an iPhone 15 Pro running iOS 27, dropping back to{" "}
          <code>198.7 MiB</code> on unload.
        </li>
        <li>
          <strong>Stability &amp; reload:</strong> <code>11.312 s</code> warm
          reload, zero OOMs or crashes across four consecutive 6-case runs, and{" "}
          <code>120/120</code> clean samples in speed testing.
        </li>
      </ul>
      <h2>A starting point for on-device apps</h2>
      <p>
        For any iOS app that needs to extract structured details from private
        notes or answer short questions locally, the repository documents every
        quantization choice, fidelity check, and device measurement—alongside a
        direct link to the downloadable model bundle.
      </p>
    </ArticlePage>
  );
}

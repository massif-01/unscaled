import { useEffect } from "react";
import { Link } from "wouter";
import { SecondaryHeader } from "@/components/SecondaryPage";

const projects = [
  {
    title: "AuraCap",
    description:
      "Send iPhone screenshots and recordings to a readable timeline you can keep in your own repository.",
    href: "/ai/auracap",
    category: "Knowledge",
    meta: "iOS / GitHub Actions / Markdown",
  },
  {
    title: "ChatRaw",
    description:
      "One place to talk to the models you choose, from a first question on your Mac to an agent task on a Linux host.",
    href: "/ai/chatraw",
    category: "Interface",
    meta: "macOS / Docker / Agents",
  },
  {
    title: "Daily Stock Analysis",
    description:
      "Keep up with a watchlist across markets, then revisit the reports when you want to see what changed.",
    href: "/ai/daily-stock-analysis",
    category: "Markets",
    meta: "Watchlists / Reports / Research",
  },
  {
    title: "Thorustinfer",
    description:
      "Turn a Jetson Thor into a local model server that your chat and coding tools can use.",
    href: "/ai/thorustinfer",
    category: "Local AI",
    meta: "Jetson Thor / Model serving",
  },
  {
    title: "Qwen3-1.7B on iPhone",
    description:
      "An account of getting a small language model to read and respond on the phone that holds the data.",
    href: "/ai/qwen3-1.7b-coreai-ios",
    category: "On-device AI",
    meta: "iPhone / Apple Core AI",
  },
  {
    title: "TianshanOS",
    description:
      "A browser console for checking an RM-01 and reaching its hardware controls when a host goes quiet.",
    href: "/ai/tianshanos",
    category: "Hardware",
    meta: "RM-01 / Remote management",
  },
  {
    title: "AuraCap · Gleanings",
    description:
      "Find the screenshot or passage you saved weeks ago without leaving the conversation you are working in.",
    href: "/ai/dsh-auracap",
    category: "Memory",
    meta: "macOS / DeepSeek Harness",
  },
] as const;

export default function AiPage() {
  useEffect(() => {
    document.title = "Projects — Unscaled";
  }, []);

  return (
    <main className="secondary-page">
      <SecondaryHeader section="Projects" />

      <div className="secondary-wrap">
        <div className="ai-intro">
          <h1 className="secondary-title">Projects</h1>
          <p className="ai-summary">
            A few projects I’ve built and am proud to share.
          </p>
        </div>

        <div className="project-index">
          {projects.map((project) => (
            <Link
              className="project-row"
              href={project.href}
              key={project.href}
            >
              <span className="project-kind">{project.category}</span>
              <h2 className="project-name">{project.title}</h2>
              <p className="project-copy">
                {project.description}
                <span className="project-meta">{project.meta}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

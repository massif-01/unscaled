import { useEffect } from "react";
import { Link } from "wouter";
import { SecondaryHeader } from "@/components/SecondaryPage";

const projects = [
  {
    title: "AuraCap",
    description:
      "Capture screenshots and recordings from iOS, process them with GitHub Actions, and keep the resulting knowledge inside your own repository.",
    href: "/ai/auracap",
    category: "Knowledge",
    meta: "iOS / GitHub Actions / Markdown",
  },
  {
    title: "ChatRaw",
    description:
      "A lightweight interface for OpenAI-compatible models, designed for direct deployment and deliberate control over the conversation surface.",
    href: "/ai/chatraw",
    category: "Interface",
    meta: "React / Docker / Local models",
  },
  {
    title: "Daily Stock Analysis",
    description:
      "Automated market analysis that combines price action, news, and model reasoning into one reviewable decision report.",
    href: "/ai/daily-stock-analysis",
    category: "Quant",
    meta: "Python / LLM / GitHub Actions",
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

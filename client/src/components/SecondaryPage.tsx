import type { ReactNode } from "react";
import { Link } from "wouter";

export function SecondaryHeader({ section }: { section: string }) {
  return (
    <header className="secondary-header">
      <Link
        className="secondary-brand"
        href="/"
        aria-label="Back to Unscaled home"
      >
        <span aria-hidden="true">Unscaled</span>
      </Link>
      <span className="secondary-page-id">{section}</span>
    </header>
  );
}

interface ArticlePageProps {
  title: string;
  summary: string;
  category: string;
  repository: string;
  children: ReactNode;
}

export function ArticlePage({
  title,
  summary,
  category,
  repository,
  children,
}: ArticlePageProps) {
  return (
    <main className="secondary-page article-page">
      <SecondaryHeader section="AI / Article" />

      <article className="secondary-wrap article-wrap">
        <header className="article-hero">
          <span className="article-kicker">Project note</span>
          <h1>{title}</h1>
          <p>{summary}</p>
        </header>

        <div className="article-layout">
          <aside className="article-aside" aria-label="Project details">
            <dl>
              <div>
                <dt>Field</dt>
                <dd>{category}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>Open source</dd>
              </div>
              <div>
                <dt>Reading</dt>
                <dd>Project overview</dd>
              </div>
            </dl>
          </aside>

          <div className="article-copy">
            {children}
            <a
              className="secondary-text-link"
              href={repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";

const staticLinks = [
  ["GitHub", "https://github.com/massif-01"],
  ["Hugging Face", "https://huggingface.co/massif"],
  ["AI", "/ai"],
  ["Info", "/info"],
  ["AuraCAP", "https://github.com/massif-01/AuraCap"],
] as const;

function StaticHomeShell() {
  return (
    <main className="static-home-shell">
      <div className="static-home-copy">
        <h1 className="static-home-wordmark">Unscaled</h1>
        <p className="static-home-tagline">
          The observer&apos;s freedom.
          <br />
          Beyond the scale.
        </p>
        <span className="static-home-meta">unscaled.me</span>
      </div>
      <nav className="static-signal-field" aria-label="Primary navigation">
        {staticLinks.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
    </main>
  );
}

const App = dynamic(() => import("../client/src/App"), {
  ssr: false,
  loading: StaticHomeShell,
});

export default function LegacyApp() {
  return <App />;
}

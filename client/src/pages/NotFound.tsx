import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="secondary-page lost-page">
      <div className="lost-signal" aria-hidden="true" />
      <div className="lost-copy">
        <span className="lost-code">404</span>
        <h1 className="lost-title">Signal lost</h1>
        <p className="lost-text">
          This address does not resolve to a page. The rest of the field is
          still active.
        </p>
        <Link className="secondary-text-link" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}

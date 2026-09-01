import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * A missing route is the first impression for anyone arriving on a stale link,
 * so it gets the same black block and the same 120px type as the hero rather
 * than Next's default. It also carries the two destinations that exist, which
 * is the actual job — an apology with no way out is not a 404 page.
 */
export default function NotFound() {
  return (
    <main className="inset-block">
      <div className="hero notfound">
        <header className="hero-bar">
          <Link className="hero-mark" href="/">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M13.4 2 4 13.6h6.1L9.2 22 20 10.2h-6.4z" fill="currentColor" />
            </svg>
            <span>{siteConfig.wordmark}</span>
          </Link>
        </header>

        <div className="hero-body">
          <p className="notfound-code">404</p>
          <h1 className="display hero-title">Nothing here</h1>
          <p className="notfound-body">
            That page doesn&rsquo;t exist — it may never have, or it may have
            moved while this site was being built.
          </p>

          <div className="notfound-actions">
            <Link className="btn" href="/">
              <span>Back to the site</span>
            </Link>
            <Link className="btn btn-accent" href={siteConfig.links.dashboard}>
              <span>Open dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

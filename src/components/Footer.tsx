import Link from "next/link";
import { RevealText } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

/** Entries with an empty href are dropped, not rendered dead. */
const COLUMNS = [
  {
    title: "Features",
    links: [
      { label: "Paste & checkout", href: "#features" },
      { label: "Onchain payments", href: "#features" },
      { label: "Global delivery", href: "#features" },
      { label: "Order tracking", href: siteConfig.links.dashboard },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: siteConfig.links.docs },
      { label: "Supported stores", href: "#stores" },
      { label: "FAQ", href: "#faq" },
      { label: "Dashboard", href: siteConfig.links.dashboard },
    ],
  },
].map((column) => ({
  ...column,
  links: column.links.filter((link) => link.href),
}));

/**
 * Closing CTA and footer, set as one dark block so the page ends on the same
 * object the hero opened with. Social links render only when their env var is
 * set, so a half-configured deploy never ships a dead link.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="inset-block">
      <div className="footer">
        <div className="container">
          <div className="footer-cta">
            <RevealText
              as="h2"
              className="display footer-title"
              lines={["Buy anything.", "Pay onchain."]}
            />

            <div className="footer-cta-side">
              <p className="footer-lede">{siteConfig.seoDescription}</p>
              <Link className="btn" href={siteConfig.links.dashboard}>
                <span>Open dashboard</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <p className="footer-col-title">Contact</p>
              <a className="footer-link" href={siteConfig.links.support}>
                Email support
              </a>
              {siteConfig.links.x ? (
                <a
                  className="footer-link"
                  href={siteConfig.links.x}
                  rel="noreferrer"
                  target="_blank"
                >
                  Follow on X
                </a>
              ) : null}
            </div>

            {COLUMNS.map((column) => (
              <div className="footer-col" key={column.title}>
                <p className="footer-col-title">{column.title}</p>
                {column.links.map((link) =>
                  // In-page anchors go through Lenis; routes go through the
                  // router. Handing a hash to <Link> breaks the smooth scroll.
                  link.href.startsWith("#") ? (
                    <a className="footer-link" key={link.label} href={link.href}>
                      {link.label}
                    </a>
                  ) : (
                    <Link className="footer-link" key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ),
                )}
              </div>
            ))}

            <div className="footer-col footer-col-chain">
              <p className="footer-col-title">Settlement</p>
              <p className="footer-chain">
                <span className="hero-chain-dot" aria-hidden="true" />
                {siteConfig.chain}
              </p>
            </div>
          </div>

          <div className="footer-base">
            <p>
              © {siteConfig.name} {year}
            </p>
            <a className="footer-link" href="#top">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

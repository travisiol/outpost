import { Reveal, RevealText } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * A list, not a logo wall.
 *
 * Logo walls are unreadable at a glance and they imply a partnership that
 * does not exist — these are storefronts we can source from, which is a
 * different claim. Set as rules and wordmarks, each row can carry the one
 * fact a buyer actually wants: what ships, and from where.
 */
const STORES = [
  {
    name: "Amazon",
    note: "Every marketplace listing, including third-party sellers",
    regions: "22 storefronts",
    status: "Live",
  },
  {
    name: "eBay",
    note: "Buy It Now and auctions won — settled the moment you commit",
    regions: "14 storefronts",
    status: "Live",
  },
  {
    name: "Specialist retail",
    note: "Electronics, parts and hobby stores added on request",
    regions: "50+ merchants",
    status: "Live",
  },
  {
    name: "Direct-to-consumer",
    note: "Brand stores with their own checkout, sourced on your behalf",
    regions: "Rolling",
    status: "Soon",
  },
] as const;

export function Stores() {
  return (
    <section className="section stores" id="stores">
      <div className="container">
        <header className="stores-head">
          <div>
            <h2 className="section-num">03 — Supported stores</h2>
            <p className="body-sm stores-fill">
              Two marketplaces and a long tail. One balance pays all of them,
              and anything missing can be requested — most additions take a day.
            </p>
          </div>

          <RevealText
            as="h3"
            className="headline stores-title"
            lines={["We don't do", "complicated", "checkout flows"]}
          />
        </header>

        <ul className="stores-list">
          {STORES.map((store, i) => (
            <li key={store.name}>
              <Reveal delay={i * 70} className="stores-row">
                <p className="stores-name">{store.name}</p>
                <p className="body-sm stores-note">{store.note}</p>
                <p className="body-sm stores-regions">{store.regions}</p>
                <span
                  className="tag stores-status"
                  data-live={store.status === "Live"}
                >
                  {store.status}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Until a docs site exists, the CTA points at the one destination
            that actually answers: a human. */}
        <Reveal className="stores-cta">
          <a
            className="btn btn-dark"
            href={siteConfig.links.docs || siteConfig.links.support}
          >
            <span>
              {siteConfig.links.docs ? "Browse all stores" : "Request a store"}
            </span>
            <span aria-hidden="true">→</span>
          </a>
          <p className="body-sm stores-cta-note">
            Missing one? Send the link and we&rsquo;ll price it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

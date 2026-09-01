import { Reveal, RevealText } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

/**
 * Three cards, three colours, one job each.
 *
 * The titles are broken into words on purpose — stacked short words at 36px
 * fill the card's upper third and give the mask something to reveal line by
 * line. A single wrapped sentence would land as a paragraph instead.
 */
const FEATURES = [
  {
    words: ["Paste", "&", "Checkout"],
    body: `Drop any product URL from Amazon, eBay or 50+ stores. Price, shipping and duties are read off the listing in seconds — nothing to type in by hand.`,
    tags: ["Amazon", "eBay", "Auto-read", "Live preview"],
    surface: "bone",
    art: "paste",
  },
  {
    words: ["Onchain", "Payments"],
    body: `Pay in ${siteConfig.tokens.join(", ")} straight from your wallet. Non-custodial by construction — the order is funded by your signature, and we never hold a balance.`,
    tags: [...siteConfig.tokens, "Non-custodial"],
    surface: "peach",
    art: "pay",
  },
  {
    words: ["Global", "Delivery"],
    body: `Ships to 48+ countries. Tax and freight are settled at checkout, not billed later, and the order is tracked from confirmation to your door.`,
    tags: ["48+ countries", "Live tracking", "Tax included"],
    surface: "blue",
    art: "deliver",
  },
] as const;

/**
 * Card ornament. Line art rather than a photograph: at 30% ink on a coloured
 * ground it stays quiet behind 36px type, and it costs nothing to load.
 */
function CardArt({ kind }: { kind: (typeof FEATURES)[number]["art"] }) {
  return (
    <svg className="feature-art" viewBox="0 0 200 200" aria-hidden="true">
      {kind === "paste" && (
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="18" y="58" width="164" height="42" rx="21" />
          <path d="M40 79h74" strokeLinecap="round" />
          <path d="M132 79h26" strokeLinecap="round" strokeDasharray="4 8" />
          <path d="M92 120v44m-22-22 22 22 22-22" strokeLinecap="round" />
        </g>
      )}

      {kind === "pay" && (
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <ellipse cx="100" cy="66" rx="62" ry="24" />
          <path d="M38 66v34c0 13 28 24 62 24s62-11 62-24V66" />
          <path d="M38 100v34c0 13 28 24 62 24s62-11 62-24v-34" />
        </g>
      )}

      {kind === "deliver" && (
        <g fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="100" cy="100" r="66" />
          <ellipse cx="100" cy="100" rx="28" ry="66" />
          <path d="M34 100h132M46 66h108M46 134h108" />
        </g>
      )}
    </svg>
  );
}

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <h2 className="section-num">01 — Features</h2>

        <RevealText
          as="div"
          className="features-lede"
          lines={[
            "Shop the stores you already use,",
            `paid in ${siteConfig.tokens.join(", ")} straight`,
            "from your own wallet.",
          ]}
        />

        <ul className="features-grid">
          {FEATURES.map((feature, i) => (
            <li key={feature.words.join(" ")}>
              <Reveal
                as="article"
                delay={i * 110}
                className={`feature feature-${feature.surface}`}
              >
                <CardArt kind={feature.art} />

                <h3 className="subhead feature-title">
                  {feature.words.map((word) => (
                    <span key={word}>{word}</span>
                  ))}
                </h3>

                <p className="body-sm feature-body">{feature.body}</p>

                <ul className="feature-tags">
                  {feature.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

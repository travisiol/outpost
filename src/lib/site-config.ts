/**
 * The entire brand lives here.
 *
 * Renaming PAYPORT means editing `name`, `wordmark` and `tagline` and nothing
 * else — no component hardcodes the brand. Everything that could plausibly be
 * wrong at launch (chain, links, figures) is a value in this file rather than
 * a string buried in JSX, so a change of mind costs one edit.
 */

/** Settlement layer. Hoisted because the copy repeats it in four places. */
const CHAIN = "Robinhood Chain";

export const siteConfig = {
  name: "PAYPORT",
  /** Shown in the nav lockup. Kept separate from `name` so casing can differ. */
  wordmark: "PayPort",
  tagline: "Buy anything. Pay onchain.",
  seoDescription:
    "Shop Amazon, eBay and 50+ stores with stablecoins paid straight from your wallet. Non-custodial, no KYC under $10k, delivered to 48+ countries.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://payport.example",

  chain: CHAIN,

  /** Tokens accepted at checkout, in display order. */
  tokens: ["USDG", "USDe", "ETH"] as const,

  /**
   * Anything that is not a route this app actually serves defaults to an empty
   * string, and every component treats empty as "don't render the link". A
   * half-configured deploy then ships a missing button rather than a 404 —
   * which is the failure a visitor forgives.
   */
  links: {
    dashboard: "/dashboard",
    docs: process.env.NEXT_PUBLIC_DOCS_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    support: "mailto:support@payport.example",
  },

  /**
   * Figures printed on the page. Every one is a claim a buyer could hold us
   * to, so they sit together where they can be checked in one pass rather
   * than scattered across four components.
   */
  stats: [
    { value: "48+", label: "Countries where we deliver, door to door" },
    { value: "2,000+", label: `Orders settled on ${CHAIN}` },
    { value: "$2.50", label: "Flat fee on orders under $100 — no spread" },
    { value: "<60s", label: "Median time from paste to signed transaction" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

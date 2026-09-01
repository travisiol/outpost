"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/lib/site-config";

/** Hostname fragments we can source from, in the order we test them. */
const RETAILERS = [
  { id: "amazon", label: "Amazon", match: "amazon." },
  { id: "ebay", label: "eBay", match: "ebay." },
] as const;

type Detection =
  | { state: "empty" }
  | { state: "invalid" }
  | { state: "unsupported"; host: string }
  | { state: "found"; label: string };

/**
 * Reads the retailer straight off the pasted URL.
 *
 * Deliberately a hostname test and nothing more. Anything cleverer — scraping
 * the page, guessing from the path — would be a promise the backend cannot
 * keep yet, and a checkout that guesses wrong about *where it is buying from*
 * is worse than one that admits it does not know.
 */
function detect(raw: string): Detection {
  const trimmed = raw.trim();
  if (!trimmed) return { state: "empty" };

  let host: string;
  try {
    host = new URL(
      /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
    ).hostname.toLowerCase();
  } catch {
    return { state: "invalid" };
  }

  // The URL parser is far more forgiving than a person expects: "not a url"
  // does not throw, it percent-encodes into the hostname. Without this check
  // we would tell someone their typo is an unsupported retailer, and print
  // "not%20a%20url" back at them as if it were a domain.
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(host)) return { state: "invalid" };

  const hit = RETAILERS.find((retailer) => host.includes(retailer.match));
  return hit ? { state: "found", label: hit.label } : { state: "unsupported", host };
}

const MESSAGES: Record<Detection["state"], string> = {
  empty: "Paste a product link to price an order.",
  invalid: "That doesn't parse as a URL — check for a missing character.",
  unsupported: "We can't source from that domain yet. Send it over and we'll add it.",
  found: "Checkout opens when the service goes live. Nothing is charged today.",
};

export function QuickCheckout() {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState<string>(siteConfig.tokens[0]);

  const detection = useMemo(() => detect(url), [url]);

  return (
    <section className="dash-card">
      <header className="dash-card-head">
        <div>
          <h2 className="dash-card-title">Quick checkout</h2>
          <p className="dash-card-sub">Paste a link, pay in one signature.</p>
        </div>

        <span className="dash-live">
          <i aria-hidden="true" />
          Live
        </span>
      </header>

      <div className="dash-field">
        <input
          type="url"
          inputMode="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="Paste an Amazon or eBay product URL…"
          aria-label="Product URL"
          aria-describedby="dash-checkout-note"
          spellCheck={false}
        />
        <button type="button" className="dash-btn dash-btn-primary" disabled>
          Start order
        </button>
      </div>

      <p className="dash-detect">
        <span className="dash-chip" data-found={detection.state === "found"}>
          {detection.state === "found" ? detection.label : "Auto-detect"}
        </span>
        {detection.state === "unsupported" ? (
          <span>Not supported: {detection.host}</span>
        ) : (
          <span>Retailer is read from the link, before anything is priced.</span>
        )}
      </p>

      <ul className="dash-tokens">
        {siteConfig.tokens.map((symbol) => (
          <li key={symbol}>
            <button
              type="button"
              className="dash-token"
              aria-pressed={token === symbol}
              onClick={() => setToken(symbol)}
            >
              <span className="dash-token-sym">{symbol}</span>
              <span className="dash-token-name">
                {symbol === "ETH" ? "Native" : "Stablecoin"}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/*
       * The button is disabled and stays disabled. There is no backend behind
       * it, and a control that looks live and quietly does nothing costs more
       * trust than one that says why it is off.
       */}
      <p className="dash-note" id="dash-checkout-note" role="status">
        {MESSAGES[detection.state]}
      </p>
    </section>
  );
}

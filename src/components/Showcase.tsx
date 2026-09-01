import Link from "next/link";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/site-config";

const TILES_TOP = [
  "24/7",
  "Anything",
  "One balance",
  "Stablecoins",
  "Unboxing",
  "Signed, not sent",
] as const;

const TILES_BOTTOM = [
  "Checkout",
  "Non-custodial",
  "Doorstep",
  "No spread",
  "48+ countries",
  "Tracked",
] as const;

/** The three states of a checkout, drawn small enough to read as a phone. */
function PhoneLeft() {
  return (
    <div className="phone phone-left" aria-hidden="true">
      <div className="phone-screen">
        <p className="phone-eyebrow">Paste a link</p>
        <div className="phone-url">amazon.com/dp/B0C…</div>

        <div className="phone-card">
          <div className="phone-thumb" />
          <div className="phone-lines">
            <span />
            <span />
          </div>
        </div>

        <dl className="phone-rows">
          <div>
            <dt>Item</dt>
            <dd>$248.00</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>$12.40</dd>
          </div>
          <div>
            <dt>Fee</dt>
            <dd>$2.50</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function PhoneRight() {
  return (
    <div className="phone phone-right" aria-hidden="true">
      <div className="phone-screen">
        <p className="phone-eyebrow">Confirm</p>

        <p className="phone-total">$262.90</p>
        <p className="phone-token">{siteConfig.tokens[0]} · {siteConfig.chain}</p>

        <div className="phone-sign">Sign transaction</div>

        <ul className="phone-steps">
          <li data-done="true">Order priced</li>
          <li data-done="true">Wallet connected</li>
          <li data-done="false">Awaiting signature</li>
        </ul>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section className="inset-block">
      <div className="showcase">
        <Marquee className="showcase-marquee" duration={34} gap="2.5rem">
          {["Non-custodial", "Onchain checkout", "Worldwide delivery"].map(
            (word) => (
              <span key={word} className="showcase-marquee-item">
                {word}
                <i aria-hidden="true">◇</i>
              </span>
            ),
          )}
        </Marquee>

        <div className="container showcase-head">
          <Reveal>
            <p className="showcase-kicker">{"{ fast }"}</p>
            <h2 className="display showcase-title">Checkout</h2>
          </Reveal>

          <Reveal delay={140} className="showcase-copy">
            <p>
              Paste a link, sign one transaction, and it ships. Median time from
              paste to signature is under sixty seconds — the wallet does the
              only step that needs you.
            </p>

            <div className="showcase-actions">
              <Link className="btn btn-accent" href={siteConfig.links.dashboard}>
                <span>Start shopping</span>
              </Link>
              <a className="btn showcase-ghost" href="#how-it-works">
                <span>How it works</span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="showcase-phones">
          <PhoneLeft />
          <PhoneRight />
        </div>

        <div className="showcase-tiles">
          <Marquee duration={46} gap="1rem">
            {TILES_TOP.map((tile) => (
              <span key={tile} className="tag tag-dark showcase-tile">
                {tile}
              </span>
            ))}
          </Marquee>

          <Marquee duration={52} gap="1rem" direction="right">
            {TILES_BOTTOM.map((tile) => (
              <span key={tile} className="tag tag-dark showcase-tile">
                {tile}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

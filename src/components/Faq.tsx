"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Placeholder copy. Every answer below is a claim a buyer could be hurt by
 * being wrong about — the KYC threshold, the custody model, the refund path —
 * so none of it should ship without a compliance read. See README.
 */
const GROUPS = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: `What is ${siteConfig.name}?`,
        a: `A purchasing service. You paste a product link, pay in ${siteConfig.tokens.join(", ")} from your own wallet, and we source the item and ship it to you. We are not a marketplace and we do not hold stock.`,
      },
      {
        q: `Is ${siteConfig.name} a wallet or an exchange?`,
        a: "Neither. Your wallet stays yours and the tokens move once, at checkout, to settle a specific order. There is no account balance to top up and nothing of yours sitting with us.",
      },
      {
        q: "Do I need to verify my identity?",
        a: "Not for ordinary orders. Above a threshold set by the jurisdiction you ship to, identity checks apply — the exact figure is confirmed before you sign, never after.",
      },
    ],
  },
  {
    id: "payments",
    label: "Payments",
    items: [
      {
        q: "Which tokens can I pay with?",
        a: `${siteConfig.tokens.join(", ")}, settled on ${siteConfig.chain}. The quote is locked when you sign, so a price move between signature and confirmation is ours to absorb, not yours.`,
      },
      {
        q: "What does non-custodial actually mean here?",
        a: "Your signature funds the order directly. We never take deposits, never hold a float on your behalf, and cannot freeze or move anything you own.",
      },
      {
        q: "What if the order can't be fulfilled?",
        a: "The order is refunded to the paying address in the token you paid, minus nothing. This is the case we expect to get right most often, so it is worth reading the terms on it.",
      },
    ],
  },
  {
    id: "fees",
    label: "Fees & pricing",
    items: [
      {
        q: "What do you charge?",
        a: "A flat $2.50 on orders under $100. Above that the fee is a percentage disclosed in the quote. There is no spread on the token conversion and no markup on the item price.",
      },
      {
        q: "Who pays tax and duty?",
        a: "You do, and it is calculated into the quote before you sign rather than billed to you on delivery. If the carrier charges more than we quoted, we cover the difference.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping",
    items: [
      {
        q: "Where do you ship?",
        a: "48+ countries. The destination is checked against the item before payment — if it cannot be delivered, you find out before you sign, not after.",
      },
      {
        q: "How long does delivery take?",
        a: "The same as the underlying store, plus a day for sourcing. Tracking is attached to the order as soon as the merchant issues it.",
      },
    ],
  },
] as const;

export function Faq() {
  const [group, setGroup] = useState(0);
  const [open, setOpen] = useState<string | null>(GROUPS[0].items[0].q);

  const active = GROUPS[group];

  return (
    <section className="section faq" id="faq">
      <div className="container">
        <header className="faq-head">
          <div>
            <h2 className="section-num">04 — FAQ</h2>
            <p className="body-sm faq-lede">
              Common questions about {siteConfig.name}, payments, fees and
              shipping.
            </p>
          </div>

          <div className="faq-tabs" role="tablist" aria-label="FAQ categories">
            {GROUPS.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`faq-tab-${item.id}`}
                aria-selected={i === group}
                aria-controls={`faq-panel-${item.id}`}
                className="faq-tab"
                onClick={() => {
                  setGroup(i);
                  setOpen(GROUPS[i].items[0].q);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <div
          className="faq-list"
          role="tabpanel"
          id={`faq-panel-${active.id}`}
          aria-labelledby={`faq-tab-${active.id}`}
        >
          {active.items.map((item) => {
            const isOpen = open === item.q;

            return (
              <div className="faq-item" key={item.q} data-open={isOpen}>
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : item.q)}
                  >
                    <span>{item.q}</span>
                    <i className="faq-sign" aria-hidden="true" />
                  </button>
                </h3>

                {/* Grid rows animate from 0fr to 1fr, which gives a real
                    height transition without measuring anything in JS. */}
                <div className="faq-a">
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="faq-foot">
          <p className="body-sm">Can&rsquo;t find what you&rsquo;re looking for?</p>
          <a className="btn btn-dark" href={siteConfig.links.support}>
            <span>Contact support</span>
          </a>
        </footer>
      </div>
    </section>
  );
}

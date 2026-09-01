"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroVisual } from "./HeroVisual";
import { siteConfig } from "@/lib/site-config";

const NAV = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Stores", href: "#stores" },
  { label: "FAQ", href: "#faq" },
] as const;

const BADGES = [
  "Non-custodial",
  `${siteConfig.chain} native`,
  "Instant checkout",
] as const;

/** The line that types itself. Split out so the caret has something to chase. */
const TYPED = "Spendable";

export function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(TYPED);
      return;
    }

    // Starts once the two masked lines have landed, so the eye arrives at the
    // third line just as it begins to write itself.
    let index = 0;
    let timer: number;

    const start = window.setTimeout(function step() {
      index += 1;
      setTyped(TYPED.slice(0, index));
      if (index < TYPED.length) timer = window.setTimeout(step, 65);
    }, 780);

    return () => {
      window.clearTimeout(start);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="inset-block" id="top">
      <div className="hero">
        <HeroVisual />
        <div className="hero-scrim" />

        <header className="hero-bar">
          <a className="hero-mark" href="#top">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M13.4 2 4 13.6h6.1L9.2 22 20 10.2h-6.4z"
                fill="currentColor"
              />
            </svg>
            <span>{siteConfig.wordmark}</span>
          </a>

          <nav className="hero-nav" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} className="hero-nav-item" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hero-actions">
            <Link className="btn" href={siteConfig.links.dashboard}>
              <span aria-hidden="true">+</span>
              <span>Open dashboard</span>
            </Link>

            {siteConfig.links.x ? (
              <a
                className="hero-icon-btn"
                href={siteConfig.links.x}
                aria-label={`${siteConfig.name} on X`}
                rel="noreferrer"
                target="_blank"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.6zm-1.1 16.1h1.8L7.7 4.8H5.8z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            ) : null}
          </div>
        </header>

        <div className="hero-body">
          {/*
           * The visible headline is decorative once the third line is being
           * typed — a screen reader would otherwise hear it letter by letter,
           * so the whole sentence is announced once and the rest is hidden.
           */}
          <h1 className="display hero-title">
            <span className="sr-only">We make stablecoins spendable</span>
            <span aria-hidden="true">
              <span className="reveal-line">
                <span className="reveal-inner">We make</span>
              </span>
              <span className="reveal-line">
                <span
                  className="reveal-inner"
                  style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
                >
                  Stablecoins
                </span>
              </span>
              <span className="reveal-line">
                <span
                  className="reveal-inner"
                  style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
                >
                  {typed}
                  <i className="hero-caret" />
                </span>
              </span>
            </span>
          </h1>

          <div className="hero-foot">
            <p className="hero-chain">
              <span className="hero-chain-dot" aria-hidden="true" />
              Powered by {siteConfig.chain}
            </p>

            <ul className="hero-badges">
              {BADGES.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          </div>

          {/*
           * The one element on the page that never stops moving. A hero this
           * still needs a single point of rotation to prove the page is alive
           * before the reader has scrolled a pixel — and it doubles as the
           * affordance telling them scrolling is what happens next.
           */}
          <a className="hero-scroll" href="#features" aria-label="Scroll to features">
            <svg className="hero-scroll-ring" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path
                  id="hero-scroll-path"
                  d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"
                  fill="none"
                />
              </defs>
              {/*
               * textLength pins the phrase to the circle's exact circumference
               * (2π × 44 ≈ 276). Without it the two repetitions run long and
               * collide at the seam, which is only visible once it spins.
               */}
              <text>
                <textPath
                  href="#hero-scroll-path"
                  startOffset="0"
                  textLength="276"
                  lengthAdjust="spacing"
                >
                  SCROLL TO EXPLORE · SCROLL TO EXPLORE ·
                </textPath>
              </text>
            </svg>
            <span className="hero-scroll-arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

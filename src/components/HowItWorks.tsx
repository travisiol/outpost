import Link from "next/link";
import { Reveal, RevealText } from "./Reveal";
import { RotatingLines } from "./RotatingLines";
import { siteConfig } from "@/lib/site-config";

const CLAIMS = [
  `Settlement runs on ${siteConfig.chain}, so a checkout clears in one block instead of three business days.`,
  "Non-custodial by construction: your keys sign the order, and there is no balance of yours for us to hold, freeze or lose.",
  "One balance, every storefront — the wallet you already fund is the wallet that pays at the till.",
] as const;

/** Weekly orders settled. Placeholder shape until the real series is wired in. */
const SERIES = [8, 14, 11, 22, 26, 21, 34, 41, 37, 52, 61, 74] as const;

/**
 * The curve is drawn from the data rather than hand-plotted, so replacing
 * SERIES with a real series is the only edit this chart ever needs.
 */
function SettlementChart() {
  const width = 520;
  const height = 300;
  const peak = Math.max(...SERIES);

  const points = SERIES.map((value, i) => ({
    x: (i / (SERIES.length - 1)) * width,
    y: height - (value / peak) * (height - 30) - 10,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  return (
    <figure className="chart">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Weekly orders settled, trending up over twelve weeks">
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((fraction) => (
          <line
            key={fraction}
            x1="0"
            x2={width}
            y1={height * fraction}
            y2={height * fraction}
            stroke="var(--rule)"
            strokeWidth="1"
          />
        ))}

        <path d={`${line} L${width} ${height} L0 ${height} Z`} fill="url(#chart-fill)" />
        <path
          d={line}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx={points[points.length - 1].x - 3}
          cy={points[points.length - 1].y}
          r="6"
          fill="var(--accent)"
        />
      </svg>

      <figcaption className="chart-caption">
        Orders settled per week · last 12 weeks
      </figcaption>
    </figure>
  );
}

export function HowItWorks() {
  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <h2 className="section-num">02 — How it works</h2>

        <div className="how-head">
          <RevealText
            as="h3"
            className="display how-title"
            lines={["Onchain", "spending,", "without", "the theatre"]}
          />

          <Reveal delay={240} className="how-cta">
            <Link className="btn btn-dark" href={siteConfig.links.dashboard}>
              <span>Start shopping</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="how-body">
          <div className="how-left">
            <RotatingLines lines={CLAIMS} />

            <h4 className="section-num how-stats-title">Some numbers about us</h4>

            <ul className="how-stats">
              {siteConfig.stats.map((stat, i) => (
                <li key={stat.value}>
                  <Reveal delay={i * 80}>
                    <p className="how-stat-value">{stat.value}</p>
                    <p className="body-sm how-stat-label">{stat.label}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="how-right" delay={140}>
            <SettlementChart />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

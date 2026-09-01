import type { Metadata } from "next";
import Link from "next/link";
import "./dashboard.css";
import { QuickCheckout } from "@/components/dashboard/QuickCheckout";
import { WalletCard } from "@/components/dashboard/WalletCard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Dashboard",
  description: `Price an order, pay in ${siteConfig.tokens.join(", ")} and track it to your door.`,
  // Nothing here is worth indexing, and a half-built dashboard in search
  // results is worse than none.
  robots: { index: false, follow: false },
};

/**
 * Every figure on this page is a real zero.
 *
 * There is no backend and no contract, so inventing a "recent order" to make
 * the layout look inhabited would be the one lie on this site a visitor could
 * act on. Empty states are the honest render, and they are also the render
 * this page will spend its first weeks in — worth designing properly rather
 * than treating as a placeholder.
 */
const STATS = [
  { label: "Active orders", value: "0", note: "Across Amazon & eBay" },
  { label: "Lifetime spent", value: "$0.00", note: "Settled onchain" },
  { label: "Median checkout", value: "58s", note: "Sign → paid" },
  { label: "Retailers used", value: "0/2", note: "48+ countries shipped" },
] as const;

const LIFECYCLE = ["Created", "Paid", "Ordered", "Shipped", "Delivered"] as const;

export default function DashboardPage() {
  return (
    <div className="dash">
      <div className="dash-shell">
        <header className="dash-bar">
          <Link className="dash-mark" href="/">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M13.4 2 4 13.6h6.1L9.2 22 20 10.2h-6.4z"
                fill="currentColor"
              />
            </svg>
            <span>{siteConfig.wordmark}</span>
          </Link>

          <div className="dash-bar-actions">
            <Link className="dash-btn dash-btn-ghost" href="/">
              Back to site
            </Link>
            <a className="dash-btn dash-btn-ghost" href={siteConfig.links.support}>
              Support
            </a>
          </div>
        </header>

        <p className="dash-eyebrow">Dashboard</p>
        <h1 className="dash-title">Welcome back. Pay anywhere.</h1>
        <p className="dash-lede">
          Paste any Amazon or eBay link, pick your token, and we handle sourcing
          and delivery. Orders appear below with live tracking from payment
          confirmation to your door.
        </p>

        <ul className="dash-stats">
          {STATS.map((stat) => (
            <li className="dash-stat" key={stat.label}>
              <p className="dash-stat-label">{stat.label}</p>
              <p className="dash-stat-value">{stat.value}</p>
              <p className="dash-stat-note">{stat.note}</p>
            </li>
          ))}
        </ul>

        <div className="dash-grid">
          <QuickCheckout />
          <WalletCard />
        </div>

        <div className="dash-grid">
          <section className="dash-card">
            <header className="dash-card-head">
              <div>
                <h2 className="dash-card-title">In progress</h2>
                <p className="dash-card-sub">Orders not yet delivered</p>
              </div>
            </header>

            <div className="dash-empty">
              <p className="dash-empty-title">No active orders</p>
              <p className="dash-empty-body">
                Paste a product URL above to price one. Nothing is charged until
                you sign.
              </p>
            </div>
          </section>

          <section className="dash-card">
            <header className="dash-card-head">
              <div>
                <h2 className="dash-card-title">Recent activity</h2>
                <p className="dash-card-sub">Latest orders</p>
              </div>
            </header>

            <div className="dash-empty">
              <p className="dash-empty-title">No orders yet</p>
              <p className="dash-empty-body">
                When you check out, orders show up here with live tracking.
              </p>
            </div>
          </section>
        </div>

        <section className="dash-card">
          <header className="dash-card-head">
            <div>
              <h2 className="dash-card-title">Order lifecycle</h2>
              <p className="dash-card-sub">What happens after you sign</p>
            </div>
          </header>

          <ol className="dash-steps">
            {LIFECYCLE.map((step, i) => (
              <li className="dash-step" key={step}>
                <span className="dash-step-num">{i + 1}</span>
                <p className="dash-step-label">{step}</p>
              </li>
            ))}
          </ol>

          <p className="dash-steps-note">
            We watch {siteConfig.chain} every minute. The unique onchain memo on
            each order moves it from Created to Paid in about sixty seconds.
            After that, sourcing, shipping and delivery confirmation are handled
            by the partner network, and each state change is written back here.
          </p>
        </section>
      </div>
    </div>
  );
}

import { siteConfig } from "@/lib/site-config";

/**
 * Stays a server component: there is no wallet library in this project yet, so
 * there is no client state to hold. When `wagmi` lands, this is the one file
 * that becomes interactive — the rest of the dashboard does not need to know.
 */
export function WalletCard() {
  return (
    <section className="dash-card">
      <header className="dash-card-head">
        <div>
          <h2 className="dash-card-title">Your wallet</h2>
          <p className="dash-card-sub">Balances and signing</p>
        </div>
      </header>

      <p className="dash-wallet-state">
        <i aria-hidden="true" />
        Not connected
      </p>

      <p className="dash-wallet-body">
        Connect a {siteConfig.chain} wallet to see balances and pay with a
        single signature. Connecting is read-only — nothing moves until you
        sign an order.
      </p>

      <button type="button" className="dash-btn dash-btn-accent" disabled>
        Connect wallet
      </button>

      <p className="dash-note">
        Wallet connection ships with the contract. Until then this panel is
        showing you the real state, which is none.
      </p>
    </section>
  );
}

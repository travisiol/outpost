"use client";

import { useEffect, useState } from "react";

/**
 * Whether a wallet is actually reachable in this browser.
 *
 * wagmi registers the injected connector whether or not anything is there to
 * inject, so `connectors.length` says nothing about whether connecting can
 * work. Trusting it leaves an enabled button that does nothing when clicked —
 * the worst version of this control, because the user concludes the site is
 * broken rather than that they need a wallet.
 *
 * So we look for a real provider: `window.ethereum` for older wallets, and the
 * EIP-6963 announcement that current ones use.
 *
 * Starts optimistic so the server render and the first client render agree,
 * then corrects itself once the browser has had a moment to answer.
 */
export function useWalletAvailable(): boolean {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let found = typeof window !== "undefined" && "ethereum" in window;

    const onAnnounce = () => {
      found = true;
      setAvailable(true);
    };

    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Wallets answer synchronously in practice; the delay is for the ones
    // that answer on the next tick.
    const timer = window.setTimeout(() => setAvailable(found), 400);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
    };
  }, []);

  return available;
}

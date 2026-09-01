"use client";

import {
  useBalance,
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
// wagmi v3's useBalance returns raw { value, decimals, symbol } — the
// `formatted` string that v2 handed back is gone, so we format it ourselves.
import { formatUnits } from "viem";
import { robinhoodChain } from "@/lib/chain";
import { useWalletAvailable } from "@/lib/useWalletAvailable";
import { siteConfig } from "@/lib/site-config";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/**
 * The five states this card can be in, and why each one exists:
 *
 *   no wallet    — nothing to connect to. The button says so instead of
 *                  sitting there enabled and doing nothing on click.
 *   ready        — a provider answered. Connect is live.
 *   connecting   — the wallet's own prompt is open.
 *   wrong chain  — connected, but signing for a network nobody is watching.
 *                  Offer the switch rather than showing a balance of zero.
 *   connected    — address and balance, and a way back out.
 *
 * A refused connection is an error worth printing. Wallets reject silently
 * from the page's point of view, and an unexplained no-op reads as a bug.
 */
export function WalletCard() {
  const { address, isConnected, chainId } = useConnection();
  const { connect, connectors, isPending: isConnecting, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { mutate: switchChain, isPending: isSwitching } = useSwitchChain();
  const walletAvailable = useWalletAvailable();

  const onRightChain = chainId === robinhoodChain.id;

  const {
    data: balance,
    isError: balanceFailed,
    isLoading: balanceLoading,
  } = useBalance({
    address,
    // Reading a balance from the wrong network returns a confident zero,
    // which is worse than reading nothing.
    query: { enabled: Boolean(address) && onRightChain },
  });

  const connector = connectors[0];
  const canConnect = walletAvailable && Boolean(connector);

  return (
    <section className="dash-card">
      <header className="dash-card-head">
        <div>
          <h2 className="dash-card-title">Your wallet</h2>
          <p className="dash-card-sub">Balances and signing</p>
        </div>
      </header>

      {isConnected && address ? (
        <>
          <p className="dash-wallet-state">
            <i aria-hidden="true" data-live={onRightChain} />
            {onRightChain ? "Connected" : "Wrong network"}
          </p>

          <p className="dash-addr" title={address}>
            {short(address)}
          </p>

          {/*
           * Three outcomes for the balance, not two. A failed RPC used to sit
           * on "Reading balance…" forever, which reads as a slow network
           * rather than a dead endpoint — and the endpoint is the thing most
           * likely to be misconfigured here. Say which one it is.
           */}
          {onRightChain ? (
            <p className="dash-balance">
              {balanceFailed
                ? "Balance unavailable"
                : balance
                  ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
                  : balanceLoading
                    ? "Reading balance…"
                    : "—"}
              <span>
                {balanceFailed
                  ? `Could not reach the ${siteConfig.chain} RPC`
                  : `on ${siteConfig.chain}`}
              </span>
            </p>
          ) : (
            <p className="dash-wallet-body">
              Your wallet is on another network. {siteConfig.chain} is where
              orders settle, so balances and signing stay off until you switch.
            </p>
          )}

          <div className="dash-wallet-actions">
            {onRightChain ? null : (
              <button
                type="button"
                className="dash-btn dash-btn-accent"
                disabled={isSwitching}
                onClick={() => switchChain({ chainId: robinhoodChain.id })}
              >
                {isSwitching ? "Switching…" : `Switch to ${siteConfig.chain}`}
              </button>
            )}

            <button
              type="button"
              className="dash-btn dash-btn-ghost"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="dash-wallet-state">
            <i aria-hidden="true" />
            Not connected
          </p>

          <p className="dash-wallet-body">
            Connect a {siteConfig.chain} wallet to see balances and pay with a
            single signature. Connecting is read-only — nothing moves until you
            sign an order.
          </p>

          <button
            type="button"
            className="dash-btn dash-btn-accent"
            disabled={!canConnect || isConnecting}
            onClick={() => connector && connect({ connector })}
          >
            {isConnecting
              ? "Connecting…"
              : canConnect
                ? "Connect wallet"
                : "No wallet found"}
          </button>

          {!canConnect && !error ? (
            <p className="dash-note">
              No browser wallet detected. Install one — MetaMask, Rabby or
              anything that speaks EIP-6963 — and this button turns on.
            </p>
          ) : null}
        </>
      )}

      {error ? (
        <p className="dash-error" role="alert">
          {error.message.split("\n")[0]}
        </p>
      ) : null}
    </section>
  );
}

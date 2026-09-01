import { defineChain } from "viem";

/**
 * Robinhood Chain network definition.
 *
 * These values are third-party research, not official documentation, and they
 * MUST be re-confirmed against https://docs.robinhood.com/chain before this
 * app is pointed at real funds. Chain ID 4663 was corroborated by two
 * independent sources (chainlist.org, trustswap.com) but the RPC and explorer
 * URLs are best-effort.
 *
 * Getting this wrong is not a cosmetic bug: a wrong chain id means the wallet
 * signs for a network nobody is watching, and a wrong RPC means balances read
 * as zero on a funded account. Every value is env-overridable so production
 * never depends on what is hardcoded here.
 */
export const ROBINHOOD_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_ROBINHOOD_CHAIN_ID ?? 4663,
);

const RPC_URL =
  process.env.NEXT_PUBLIC_ROBINHOOD_RPC_URL ??
  "https://rpc.mainnet.chain.robinhood.com";

const EXPLORER_URL =
  process.env.NEXT_PUBLIC_ROBINHOOD_EXPLORER_URL ??
  "https://robinhoodchain.blockscout.com";

export const robinhoodChain = defineChain({
  id: ROBINHOOD_CHAIN_ID,
  name: "Robinhood Chain",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    default: {
      name: "Robinhood Chain Explorer",
      url: EXPLORER_URL,
    },
  },
  testnet: false,
});

import { createConfig, http, injected } from "wagmi";
import { robinhoodChain } from "@/lib/chain";

/**
 * Injected wallets only.
 *
 * No WalletConnect: it needs a project id, a relay and a QR modal, which is a
 * lot of surface for a page whose only job today is to read an address. When
 * mobile wallets matter, this is the file that grows a second connector.
 */
export const wagmiConfig = createConfig({
  chains: [robinhoodChain],
  connectors: [injected()],
  transports: {
    [robinhoodChain.id]: http(),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, optimism, base } from "wagmi/chains";
import { http } from "wagmi";

export const wagmiConfig = getDefaultConfig({
  appName: "Cowree",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "cowree-demo",
  chains: [mainnet, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]:  http("https://cloudflare-eth.com"),
    [polygon.id]:  http("https://polygon-rpc.com"),
    [arbitrum.id]: http("https://arb1.arbitrum.io/rpc"),
    [optimism.id]: http("https://mainnet.optimism.io"),
    [base.id]:     http("https://mainnet.base.org"),
  },
  ssr: false,
});

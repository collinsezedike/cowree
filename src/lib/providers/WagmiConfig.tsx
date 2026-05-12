import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, arbitrum, optimism, base } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Cowree",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID ?? "cowree-demo",
  chains: [mainnet, polygon, arbitrum, optimism, base],
  ssr: false,
});

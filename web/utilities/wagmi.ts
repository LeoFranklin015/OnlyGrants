import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  flowTestnet,
  lineaSepolia,
  rootstockTestnet,
} from "wagmi/chains";

import { Chain } from "wagmi/chains";

const fhenixHelium: Chain = {
  id: 8008135,
  name: "Fhenix Helium",
  nativeCurrency: {
    decimals: 18,
    name: "Fhenix",
    symbol: "tFHE",
  },
  rpcUrls: {
    public: { http: ["https://api.helium.fhenix.zone"] },
    default: { http: ["https://api.helium.fhenix.zone"] },
  },
  blockExplorers: {
    default: { name: "FhenixExplorer", url: "https://explorer.helium.fhenix.zone" },
  },
};


export const config = getDefaultConfig({
  appName: "OnlyGrants",
  projectId: "74d918ff1c56aebee3479fb3959e285c",
  chains: [polygon, mainnet, flowTestnet, lineaSepolia, rootstockTestnet, fhenixHelium],
  ssr: true,
});

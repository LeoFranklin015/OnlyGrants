import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  flowTestnet,
  lineaSepolia,
  rootstockTestnet,
} from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "OnlyGrants",
  projectId: "74d918ff1c56aebee3479fb3959e285c",
  chains: [polygon, mainnet, flowTestnet, lineaSepolia, rootstockTestnet],
  ssr: true,
});

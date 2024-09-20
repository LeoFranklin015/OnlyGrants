import { ethers } from "ethers";
import { Chain, ChainData } from "./utils";

export const getProvider = (chain: Chain) => {
  const RPC = ChainData[chain].RPCUrl;
  return new ethers.providers.JsonRpcProvider(RPC);
};

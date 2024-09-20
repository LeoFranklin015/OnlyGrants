import { getProvider } from "./getProvider";
import { Chain } from "./utils";

export const getBalance = async (
  address: string,
  chain: Chain
): Promise<number> => {
  const provider = getProvider(chain);
  const balance = await provider.getBalance(address);
  return parseFloat(balance.toString());
};

import { completeTransaction } from "./completeTransaction";
import { encodeData } from "./encodeData";
import { getGasPrice } from "./getGasPrice";
import { getProvider } from "./getProvider";
import { Wallet } from "./near";
import { Chain, ChainData } from "./utils";

export const functionCall = async (
  from: string,
  to: string,
  method: string,
  args: any,
  ret: any,
  chain: Chain,
  wallet: Wallet
) => {
  const chainId = ChainData[chain].chainId;
  const provider = getProvider(chain);
  console.log("call contract", to);
  const { data } = encodeData(method, args, ret);
  const gasPrice = await getGasPrice();
  const nonce = await provider.getTransactionCount(from);
  const baseTx = {
    to,
    nonce,
    data,
    value: 0,
    gasLimit: 1000000, // 1m
    gasPrice,
    chainId,
  };
  await completeTransaction(from, baseTx, chainId, wallet, chain);
};

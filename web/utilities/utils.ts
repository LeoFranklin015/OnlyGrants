export const ChainData = {
  flow: {
    RPCUrl: "https://testnet.evm.nodes.onflow.org",
    chainId: 545,
    currency: "FLOW",
  },
};

export type Chain = keyof typeof ChainData;

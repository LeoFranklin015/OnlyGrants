export const ChainData = {
  flow: {
    RPCUrl: "https://testnet.evm.nodes.onflow.org",
    chainId: 545,
    // RPCUrl: "https://api.helium.fhenix.zone",
    // chainId: 8008135,
    currency: "FLOW",
  },
};

export type Chain = keyof typeof ChainData;

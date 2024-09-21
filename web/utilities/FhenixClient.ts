import { FhenixClient } from "fhenixjs";
import { ethers } from "ethers";

// initialize your web3 provider
const provider = new ethers.providers.JsonRpcProvider(
  "https://api.helium.fhenix.zone"
);

// initialize Fhenix Client
const client = new FhenixClient({ provider: provider as any });

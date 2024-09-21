// Plugins
// Tasks
import "./tasks";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import "fhenix-hardhat-docker";
import "fhenix-hardhat-plugin";
import "fhenix-hardhat-network";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";

// DOTENV_CONFIG_PATH is used to specify the path to the .env file for example in the CI
const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const TESTNET_CHAIN_ID = 412346;
const TESTNET_RPC_URL = "http://127.0.0.1:42069";

const testnetConfig: any = {
  chainId: TESTNET_CHAIN_ID,
  url: TESTNET_RPC_URL,
  accounts: process.env.WALLET ? [process.env.WALLET] : [],
  gasLimit: 8000000, // Manual gas limit
};

// Select either private keys or mnemonic from .env file or environment variables
const keys = process.env.KEY;
if (!keys) {
  let mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    throw new Error("No mnemonic or private key provided, please set MNEMONIC or KEY in your .env file");
  }
  testnetConfig.accounts = {
    mnemonic,
    path: "m/44'/60'/0'/0",
    count: 10,
  };
} else {
  testnetConfig.accounts = [keys];
}

const config: HardhatUserConfig = {
  solidity: "0.8.25",
  defaultNetwork: "localfhenix",
  networks: {
    localfhenix: testnetConfig,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;

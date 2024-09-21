/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext, useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout";
import { NearContext } from "@/utilities/context";
import { generateAddress } from "@/utilities/kdf";
import { completeTransaction } from "@/utilities/completeTransaction";
import BN from "bn.js";
import { ethers } from "ethers";
import { getGasPrice } from "@/utilities/getGasPrice";
import { getProvider } from "@/utilities/getProvider";
import { getBalance } from "@/utilities/getBalance";
import { functionCall } from "@/utilities/functionCall";
import WorldCoinConnect from "./components/WorldConnect";

export default function Rounds() {
  const { signedAccountId, wallet } = useContext(NearContext);

  const [address, setAddress] = useState("");
  // const [sign, setSign] = useState(null);

  // Fetch Ethereum address when component mounts
  useEffect(() => {
    const fetchAddress = async () => {
      const address = await generateAddress(
        "secp256k1:54hU5wcCmVUPFWLDALXMh1fFToZsVXrx9BbTbHzSfQq1Kd1rJZi52iPa4QQxo6s5TgjWqgpY8HamYuUDzG6fAaUq",
        signedAccountId,
        "ethereum-1",
        "ethereum"
      );
      console.log(address);
      setAddress(address.address as string);
    };
    fetchAddress();
  }, [signedAccountId]);

  const sendTransaction = async () => {
    const gasLimit = 89923310;
    const chainId = 545;
    const currency = "FLOW";
    const amount = "0.001";
    const to = "0x525521d79134822a342d330bd91DA67976569aF1";

    if (!address) {
      console.log("must provide a sending address");
      return;
    }

    const balance = await getBalance(address, "flow");
    const provider = getProvider("flow");
    const nonce = await provider.getTransactionCount(address);
    // const gasPrice = await getGasPrice();
    const gasPrice = 80593953;

    const value = ethers.utils.hexlify(ethers.utils.parseUnits(amount));
    if (value === "0x00") {
      console.log("Amount is zero. Please try a non-zero amount.");
      return;
    }

    if (
      !balance ||
      new BN(balance.toString()).lt(
        new BN(ethers.utils.parseUnits(amount).toString()).add(
          new BN(gasPrice).mul(new BN(gasLimit.toString()))
        )
      )
    ) {
      console.log("insufficient funds in address", address);
      return;
    }

    console.log("sending", amount, currency, "from", address, "to", to);

    const baseTx = {
      to,
      nonce,
      data: [],
      value,
      gasLimit,
      gasPrice,
      chainId,
    };

    await completeTransaction(address, baseTx, chainId, wallet, "flow");
  };

  return (
    <AppLayout title="Projects">
      <div>Hello</div>
      <button
        className=" bg-blue-700"
        onClick={async () => {
          console.log("started");
          await sendTransaction();
          console.log("Completed");
        }}
      >
        Send
      </button>

      <button
        className=" bg-red-600 p-4"
        onClick={async () => {
          console.log("started");
          // await functionCall(
          //   address,
          //   "0x6c50c6fab41b878e45c08d99223ffb494a6c5328",
          //   "store",
          //   { num: 2 },
          //   [],
          //   "flow",
          //   wallet
          // );
          // console.log("Completed");
          await functionCall(
            address,
            "0x906a57aCa067178e76e6eBDF4C7b26CBcAEC0Edd",
            "createRound",
            { ma: 2, m: "hello", vp: 1 },
            [],
            "flow",
            wallet
          );
          console.log("Completed");
        }}
      >
        Function Call
      </button>
      {/* <WorldCoinConnect /> */}
    </AppLayout>
  );
}

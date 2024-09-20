import { ethers } from "ethers";

export const encodeData = (method: string, args: any, ret: any) => {
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "retrieve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const iface = new ethers.utils.Interface(abi);
  const allArgs = [];
  const argValues = Object.values(args);
  for (let i = 0; i < argValues.length; i++) {
    allArgs.push(argValues[i]);
  }

  console.log(abi[0], "with args", allArgs);

  return {
    iface,
    data: iface.encodeFunctionData(method, allArgs),
  };
};

import { ethers } from "ethers";

export const encodeData = (method: string, args: any, ret: any) => {
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
      ],
      name: "applyForRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "BalanceToppedUp",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "cancelRound",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "ma",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "m",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "validity",
          type: "uint256",
        },
      ],
      name: "createRound",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "rId",
          type: "uint256",
        },
      ],
      name: "distributeFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "projectId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "donate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "projectId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "donor",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "DonationMade",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "newMetadata",
          type: "string",
        },
      ],
      name: "editRoundMetadata",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "finalizeRoundPoll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "FundsDistributed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "projectId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "projectOwner",
          type: "address",
        },
      ],
      name: "ProjectApplied",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "RoundCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "profileOwner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "matchingAmount",
          type: "uint256",
        },
      ],
      name: "RoundCreated",
      type: "event",
    },
    {
      inputs: [],
      name: "topUpBalance",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balances",
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
    {
      inputs: [
        {
          internalType: "uint256",
          name: "roundId",
          type: "uint256",
        },
      ],
      name: "getRoundPollWinner",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "rounds",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "profileOwner",
          type: "address",
        },
        {
          internalType: "string",
          name: "metadata",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "matchingAmount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "nextProjectId",
          type: "uint256",
        },
        {
          internalType: "contract Poll",
          name: "poll",
          type: "address",
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

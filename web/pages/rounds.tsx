/* eslint-disable @next/next/no-img-element */
"use client";

import AppLayout from "@/layouts/AppLayout";

const rounds = [
  {
    title: "Decentralized Finance Platform",
    imageUrl:
      "https://images.unsplash.com/photo-1621976491927-0b8c82ae6c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
    category: { name: "DeFi", href: "https://example.com/categories/defi" },
    description:
      "A decentralized platform offering seamless DeFi solutions with staking, lending, and borrowing features.",
    author: {
      name: "Alice Johnson",
      href: "https://example.com/authors/alice-johnson",
      imageUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
    },
    date: "2024-09-01",
    datetime: "2024-09-01T12:00:00Z",
    readingTime: "5 min",
    href: "https://example.com/projects/defi-platform",
  },
  {
    title: "NFT Marketplace for Creators",
    imageUrl:
      "https://images.unsplash.com/photo-1626187156026-03e6b8a5bbae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
    category: { name: "NFT", href: "https://example.com/categories/nft" },
    description:
      "A platform for creators to mint, sell, and trade NFTs with a global audience.",
    author: {
      name: "John Smith",
      href: "https://example.com/authors/john-smith",
      imageUrl:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
    },
    date: "2024-08-28",
    datetime: "2024-08-28T12:00:00Z",
    readingTime: "4 min",
    href: "https://example.com/projects/nft-marketplace",
  },
  {
    title: "Cross-Chain Token Bridge",
    imageUrl:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080",
    category: {
      name: "Cross-Chain",
      href: "https://example.com/categories/cross-chain",
    },
    description:
      "A token bridge enabling seamless transfer of assets across multiple blockchain networks.",
    author: {
      name: "Sara Lee",
      href: "https://example.com/authors/sara-lee",
      imageUrl:
        "https://images.unsplash.com/photo-1502378735452-bc7d86632805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzU2fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
    },
    date: "2024-09-03",
    datetime: "2024-09-03T12:00:00Z",
    readingTime: "6 min",
    href: "https://example.com/projects/cross-chain-token-bridge",
  },
];

export default function Rounds() {
  return (
    <AppLayout title="Projects">
      <div className="my-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
        {rounds.map((round) => (
          <div
            key={round.title}
            className="flex flex-col overflow-hidden rounded-lg shadow-lg"
          >
            <div className="flex-shrink-0">
              <img
                alt=""
                src={round.imageUrl}
                className="h-48 w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-white p-6">
              <div className="flex-1">
                <p className="text-sm font-medium text-indigo-600">
                  <a href={round.category.href} className="hover:underline">
                    {round.category.name}
                  </a>
                </p>
                <a href={round.href} className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900">
                    {round.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {round.description}
                  </p>
                </a>
              </div>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <a href={round.author.href}>
                    <span className="sr-only">{round.author.name}</span>
                    <img
                      alt=""
                      src={round.author.imageUrl}
                      className="h-10 w-10 rounded-full"
                    />
                  </a>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    <a href={round.author.href} className="hover:underline">
                      {round.author.name}
                    </a>
                  </p>
                  <div className="flex space-x-1 text-sm text-gray-500">
                    <time dateTime={round.datetime}>{round.date}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{round.readingTime} read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}

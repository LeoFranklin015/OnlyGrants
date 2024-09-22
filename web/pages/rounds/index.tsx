/* eslint-disable @next/next/no-img-element */
"use client";

import AppLayout from "@/layouts/AppLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useReadContract } from "wagmi"
import contract from "../../utilities/contract.json";

const projects = [

  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function daysLeftToDate(futureDate: any) {
  const currentDate = new Date();
  const targetDate = new Date(futureDate);

  // Calculate the difference in milliseconds
  const diffTime = targetDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days (1000 ms/s * 60 s/min * 60 min/hr * 24 hr/day)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

const Card = ({
  name,
  network,
  startDate,
  endDate,
  matchingPool,
  description,
  projectsCount,
}: {
  name: string | undefined;
  network: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  matchingPool: number | undefined;
  description: string | undefined;
  projectsCount: number | undefined;
}) => (
  <div className="rounded-3xl bg-white shadow-lg overflow-hidden a > { hover:opacity-90 transition hover:shadow-none } w-full">
    <Link
      target="_blank"
      href={`/rounds/${name}`}
      data-testid="round-card"
      data-track-event="round-card"
      rel="noreferrer"
    >
      <div className="w-full relative">
        <div className="overflow-hidden h-32">
          <div
            className="bg-black blur w-[120%] h-[120%] -mt-4 -ml-4 brightness-[40%] object-cover"
            style={{
              backgroundImage: `url(/stock-photos/${Math.floor(
                Math.random() * 8
              )}.jpg)`,
            }}
          />
        </div>
        <div
          color="green"
          className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-green-100 rounded-full absolute top-3 right-3"
        >
          {network}
        </div>
        <div
          data-testid="round-name"
          className="w-full text-[24px] font-medium truncate pb-1 absolute bottom-1 px-2 text-white"
        >
          {name}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div
          data-testid="round-description"
          className="text-sm md:text-base text-ellipsis line-clamp-4 text-gray-400 leading-relaxed min-h-[96px]"
        >
          {description}
        </div>
        <div className="flex gap-2 justfy-between items-center">
          <div className="flex-1">
            <div
              data-testid="apply-days-left"
              className="text-xs w-full font-mono whitespace-nowrap"
            >
              Round Start Date: {startDate && startDate.toLocaleString()}
            </div>
            <div
              data-testid="days-left"
              className="text-xs w-full font-mono whitespace-nowrap"
            >
              {daysLeftToDate(endDate)} Days Left to Apply
            </div>
          </div>
          <div
            color="blue"
            data-testid="round-badge"
            className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-blue-100 rounded-lg"
          >
            Quadratic Funding
          </div>
        </div>
        <div className="border-t" />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div
              data-testid="approved-applications-count"
              className="text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-gray-100 rounded-lg"
            >
              {projectsCount} projects
            </div>
            <div className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-gray-100 rounded-lg">
              <span className="mr-1" data-testid="match-amount">
                <NumericFormat
                  value={matchingPool ? matchingPool : 0}
                  displayType="text"
                  thousandSeparator=","
                />
              </span>
              <span data-testid="match-token">USDC match</span>
            </div>
          </div>
          <div>
            <img
              className="w-8"
              src="blob:https://explorer.gitcoin.co/fa4da5dc-b789-48e6-a867-c2a54717d23a"
              alt=""
            />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const RoundCard = ({
  id,
  owner,
  matchingPool,
}: {
  id: string | undefined;
  owner: string | undefined;
  matchingPool: number | undefined;
}) => {
  console.log(id, owner, matchingPool)

  const { data, isLoading } = useReadContract({
    address: contract.address as `0x${string}`,
    abi: contract.abi,
    functionName: "rounds",
    args: [id],
  })

  useEffect(() => {
    console.log(data)
  }, [data])


  return isLoading && !data ? <div>Loading...</div> : <div><div className="rounded-3xl bg-white shadow-lg overflow-hidden a > { hover:opacity-90 transition hover:shadow-none } w-full">
    <Link
      href={`/rounds/${id}`}
      data-testid="round-card"
      data-track-event="round-card"
      rel="noreferrer"
    >
      {/* {JSON.stringify(data)} */}
      <div className="w-full relative">
        <div className="overflow-hidden h-32">
          <div
            className="bg-black blur w-[120%] h-[120%] -mt-4 -ml-4 brightness-[40%] object-cover"
            style={{
              backgroundImage: `url(/stock-photos/${Math.floor(
                Math.random() * 8
              )}.jpg)`,
            }}
          />
        </div>
        <div
          color="green"
          className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-green-100 rounded-full absolute top-3 right-3"
        >
          {JSON.parse(data?.[2] as string)?.chain}
        </div>
        <div
          data-testid="round-name"
          className="w-full text-[24px] font-medium truncate pb-1 absolute bottom-1 px-2 text-white"
        >
          {JSON.parse(data?.[2] as string)?.projectName || "No name available"}
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div
          data-testid="round-description"
          className="text-sm md:text-base text-ellipsis line-clamp-4 text-gray-400 leading-relaxed min-h-[96px]"
        >
          {JSON.parse(data?.[2] as string)?.description || "No description available"}
        </div>
        <div className="flex gap-2 justfy-between items-center">
          <div className="flex-1">
            <div
              data-testid="apply-days-left"
              className="text-xs w-full font-mono whitespace-nowrap"
            >
              Round Start Date:
              {JSON.parse(data?.[2] as string)?.startDate && JSON.parse(data?.[2] as string)?.startDate.toLocaleString()}
            </div>
            <div
              data-testid="days-left"
              className="text-xs w-full font-mono whitespace-nowrap"
            >
              {daysLeftToDate(JSON.parse(data?.[2] as string)?.endDate)} Days Left to Apply
            </div>
          </div>
          <div
            color="blue"
            data-testid="round-badge"
            className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-blue-100 rounded-lg"
          >
            Quadratic Funding
          </div>
        </div>
        <div className="border-t" />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div
              data-testid="approved-applications-count"
              className="text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-gray-100 rounded-lg"
            >
              {0} projects
            </div>
            <div className="font-mono text-xs text-gray-900 whitespace-nowrap inline-flex max-w-full w-fit items-center justify-center px-2 py-1.5 bg-gray-100 rounded-lg">
              <span className="mr-1" data-testid="match-amount">
                <NumericFormat
                  value={JSON.parse(data?.[2] as string)?.matchingPool || 0}
                  displayType="text"
                  thousandSeparator=","
                />
              </span>
              <span data-testid="match-token">USDC match</span>
            </div>
          </div>
          <div>
            <img
              className="w-8"
              src="blob:https://explorer.gitcoin.co/fa4da5dc-b789-48e6-a867-c2a54717d23a"
              alt=""
            />
          </div>
        </div>
      </div>
    </Link>
  </div></div>
}

export default function RoundsIndex() {
  const [rounds, setRounds] = useState<{
    id: string;
    owner: string;
    matchingPool: number;
  }[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rounds`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRounds(data);
      });
  }, []);


  return (
    <AppLayout title="Rounds">

      <div className="my-10">
        <h1 className="text-5xl font-bold">Explore Rounds</h1>
        <div className="mt-5 mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              name={project.title}
              network="Ethereum"
              startDate={new Date()}
              endDate={new Date()}
              matchingPool={1000}
              description={project.description}
              projectsCount={3}
            />
          ))}
          {rounds.map((round, index) => (
            <RoundCard
              key={index}
              id={round.id}
              owner={round.owner}
              matchingPool={round.matchingPool}
            />
          ))}
        </div>
      </div>

    </AppLayout>
  );
}

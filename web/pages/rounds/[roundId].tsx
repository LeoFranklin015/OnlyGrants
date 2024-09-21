/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import { CalendarIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

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

export default function Round() {
  const router = useRouter();

  return (
    <AppLayout title={router.query.roundId}>
      <div className="flex items-center gap-x-2 mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Public Good in The Metaverse | Summer Round
          </h1>
        </div>
        <span className="bg-primary-100 text-primary-600 text-sm px-3 py-2 font-semibold rounded-full">
          71 days left
        </span>
      </div>

      <div>
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Quadratic Funding
        </span>
      </div>

      <div className="mt-5 flex items-center mb-6">
        <span className="text-base font-medium text-gray-900">on Base</span>
      </div>

      <div className="grid grid-cols-10 items-center">
        <div className="col-span-8 mb-6">
          <div className="flex items-center mb-2">
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-600">Apply</span>
            <span className="mx-2">
              <CalendarIcon className="w-5 h-5 text-gray-500 ml-auto" />
            </span>
            <span className="text-sm text-gray-900 font-medium">
              2024/08/14 09:30 IST - 2024/12/01 10:30 IST
            </span>
          </div>

          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-gray-600">Donate</span>
            <span className="mx-2">
              <CalendarIcon className="w-5 h-5 text-gray-500 ml-auto" />
            </span>
            <span className="text-sm text-gray-900 font-medium">
              2024/08/15 09:30 IST - 2024/12/01 10:30 IST
            </span>
          </div>
        </div>

        <div className="col-span-2 flex justify-between items-center mb-6">
          <div className="bg-gray-200 rounded-lg p-6">
            <span className="text-2xl font-semibold text-gray-900">
              350,000 USDC
            </span>
            <span className="mt-2 block text-base text-gray-900">
              Matching Pool
            </span>
          </div>
        </div>
      </div>

      <p className="text-base text-gray-900 mb-6">
        We are spotlighting initiatives that are advancing the Metaverse as a
        Public Good. These projects focus on creating interoperable, open, and
        decentralized dApps and experiences, dedicated to developing a truly
        decentralized Metaverse built on open standards.
      </p>

      <div className="my-10 w-full border-b border-gray-200" />

      <div className="flex justify-center">
        <div className="p-8 rounded-lg text-sm bg-gray-200 text-gray-600 text-center">
          <div>
            Applications close in{" "}
            <span className="font-semibold">71 days, 16 minutes!</span>
          </div>
          <button className="mt-5 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Apply now!
          </button>
        </div>
      </div>

      <div className="my-10 w-full border-b border-gray-200" />

      <div>
        <h1 className="text-2xl">Explore Projects</h1>
        <div className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              name={project.title}
              description={project.description}
              profileImageUrl={project.imageUrl}
              coverImageUrl={project.imageUrl}
              totalRaised="1000 USDC"
              contributors={10}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const Card = ({
  name,
  description,
  profileImageUrl,
  coverImageUrl,
  totalRaised,
  contributors,
}: {
  name: string | undefined;
  description: string | undefined;
  profileImageUrl: string | undefined;
  coverImageUrl: string | undefined;
  totalRaised: string | undefined;
  contributors: number | undefined;
}) => (
  <div className="rounded-3xl bg-white shadow-lg overflow-hidden a > { } w-full h-[370px] hover:opacity-90 transition relative hover:shadow-none">
    <Link
      target="_blank"
      href={`/projects/${name}`}
      data-track-event="project-card"
    >
      <div className="w-full relative">
        <div>
          <img
            className="bg-black h-[120px] w-full object-cover rounded-t"
            src={coverImageUrl}
            alt="Project Banner"
          />
        </div>
      </div>
      <div className="p-4 space-y-4 relative">
        <img
          className="object-cover rounded-full border-solid border-2 border-white absolute -top-[24px] "
          src={profileImageUrl}
          alt="Project Banner"
          style={{ height: 48, width: 48 }}
        />
        <div className="truncate mt-4">{name}</div>
        <div className="text-sm md:text-base text-ellipsis line-clamp-4 text-grey-400 leading-relaxed min-h-[96px]">
          <div className="text-sm line-clamp-4">{description}</div>
        </div>
      </div>
    </Link>
    <div className="absolute bottom-0 inset-x-0 h-20 w-full bg-white">
      <div className="p-4 space-y-4 px-2 text-xs">
        <div className="border-t pt-1 flex items-center justify-between ">
          <div className="px-2">
            <p className="text-sm">{totalRaised}</p>
            <p className="text-sm font-mono">
              total raised by {contributors} contributors
            </p>
          </div>
          <div>
            <div className="cursor-pointer" data-testid="add-to-cart">
              <CurrencyDollarIcon className="w-10 h-10 text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

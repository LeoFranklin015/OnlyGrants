/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/router";

import AppLayout from "@/layouts/AppLayout";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { usePopup } from "@/utilities/projectContext";

interface Project {
  network: string;
  name: string;
  openSourceObserverName: string;
  website: string;
  projectLogoUrl: string;
  projectCoverUrl: string;
  description: string;
  createdDate: string; // ISO 8601 format date
  twitterUrl: string;
  ownerAddress: string;
  fundingSources: string;
  teamSize: number;
}

const projects = [
  {
    network: "Ethereum",
    name: "MesonFi",
    openSourceObserverName: "MesonFi",
    website: "https://meson.fi/",
    projectLogoUrl:
      "https://docs.meson.fi/~gitbook/image?url=https%3A%2F%2F1966107664-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWJ9Xuoax4XwtI4AskpIb%252Ficon%252FL1gVbDPzMVPwHEi51o4W%252Flogo192.png%3Falt%3Dmedia%26token%3D4f3d4d82-dd19-4ddb-b9ce-eaa23cfdb32f&width=32&dpr=1&quality=100&sign=a1a21306&sv=1",
    projectCoverUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    description:
      "MesonFi is a decentralized finance platform that allows users to earn interest on their crypto assets.",
    createdDate: "2024-07-16T00:00:00.000Z",
    twitterUrl: "https://twitter.com/mesonfi",
    ownerAddress: "0xD1Ffeuo47briwgyfwi7b4749gbwig979bh6Caa",
    fundingSources: "None",
    teamSize: 1,
  },
  {
    network: "Ethereum",
    name: "MesonFi",
    openSourceObserverName: "MesonFi",
    website: "https://meson.fi/",
    projectLogoUrl:
      "https://docs.meson.fi/~gitbook/image?url=https%3A%2F%2F1966107664-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWJ9Xuoax4XwtI4AskpIb%252Ficon%252FL1gVbDPzMVPwHEi51o4W%252Flogo192.png%3Falt%3Dmedia%26token%3D4f3d4d82-dd19-4ddb-b9ce-eaa23cfdb32f&width=32&dpr=1&quality=100&sign=a1a21306&sv=1",
    projectCoverUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    description:
      "MesonFi is a decentralized finance platform that allows users to earn interest on their crypto assets.",
    createdDate: "2024-07-16T00:00:00.000Z",
    twitterUrl: "https://twitter.com/mesonfi",
    ownerAddress: "0xD1Ffeuo47briwgyfwi7b4749gbwig979bh6Caa",
    fundingSources: "None",
    teamSize: 1,
  },
  {
    network: "Ethereum",
    name: "MesonFi",
    openSourceObserverName: "MesonFi",
    website: "https://meson.fi/",
    projectLogoUrl:
      "https://docs.meson.fi/~gitbook/image?url=https%3A%2F%2F1966107664-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWJ9Xuoax4XwtI4AskpIb%252Ficon%252FL1gVbDPzMVPwHEi51o4W%252Flogo192.png%3Falt%3Dmedia%26token%3D4f3d4d82-dd19-4ddb-b9ce-eaa23cfdb32f&width=32&dpr=1&quality=100&sign=a1a21306&sv=1",
    projectCoverUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    description:
      "MesonFi is a decentralized finance platform that allows users to earn interest on their crypto assets.",
    createdDate: "2024-07-16T00:00:00.000Z",
    twitterUrl: "https://twitter.com/mesonfi",
    ownerAddress: "0xD1Ffeuo47briwgyfwi7b4749gbwig979bh6Caa",
    fundingSources: "None",
    teamSize: 1,
  },
  {
    network: "Ethereum",
    name: "MesonFi",
    openSourceObserverName: "MesonFi",
    website: "https://meson.fi/",
    projectLogoUrl:
      "https://docs.meson.fi/~gitbook/image?url=https%3A%2F%2F1966107664-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWJ9Xuoax4XwtI4AskpIb%252Ficon%252FL1gVbDPzMVPwHEi51o4W%252Flogo192.png%3Falt%3Dmedia%26token%3D4f3d4d82-dd19-4ddb-b9ce-eaa23cfdb32f&width=32&dpr=1&quality=100&sign=a1a21306&sv=1",
    projectCoverUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    description:
      "MesonFi is a decentralized finance platform that allows users to earn interest on their crypto assets.",
    createdDate: "2024-07-16T00:00:00.000Z",
    twitterUrl: "https://twitter.com/mesonfi",
    ownerAddress: "0xD1Ffeuo47briwgyfwi7b4749gbwig979bh6Caa",
    fundingSources: "None",
    teamSize: 1,
  },
  {
    network: "Ethereum",
    name: "MesonFi",
    openSourceObserverName: "MesonFi",
    website: "https://meson.fi/",
    projectLogoUrl:
      "https://docs.meson.fi/~gitbook/image?url=https%3A%2F%2F1966107664-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FWJ9Xuoax4XwtI4AskpIb%252Ficon%252FL1gVbDPzMVPwHEi51o4W%252Flogo192.png%3Falt%3Dmedia%26token%3D4f3d4d82-dd19-4ddb-b9ce-eaa23cfdb32f&width=32&dpr=1&quality=100&sign=a1a21306&sv=1",
    projectCoverUrl:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    description:
      "MesonFi is a decentralized finance platform that allows users to earn interest on their crypto assets.",
    createdDate: "2024-07-16T00:00:00.000Z",
    twitterUrl: "https://twitter.com/mesonfi",
    ownerAddress: "0xD1Ffeuo47briwgyfwi7b4749gbwig979bh6Caa",
    fundingSources: "None",
    teamSize: 1,
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
            <Card key={index} {...project} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

const Card: React.FC<Project> = ({
  name,
  projectLogoUrl,
  projectCoverUrl,
  description,
}) => {
  const { setPopupData, togglePopupVisibility } = usePopup();

  const handleClick = () => {
    setPopupData(name || "");
    togglePopupVisibility(true); // Show the popup
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg overflow-hidden w-full hover:opacity-90 transition hover:shadow-none hover:cursor-pointer">
      <div onClick={handleClick}>
        <div className="w-full relative">
          <div>
            <img
              className="bg-black h-[120px] w-full object-cover rounded-t"
              src={projectCoverUrl}
              alt="Project Banner"
            />
          </div>
        </div>
        <div className="p-4 space-y-4 relative">
          <img
            className="object-cover rounded-full border-solid border-2 border-white absolute -top-[24px]"
            src={projectLogoUrl}
            alt="Profile"
            style={{ height: 48, width: 48 }}
          />
          <div className="truncate mt-4">{name}</div>
          <div className="text-sm md:text-base text-ellipsis line-clamp-4 text-grey-400 leading-relaxed min-h-[96px]">
            <div className="text-sm line-clamp-4">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

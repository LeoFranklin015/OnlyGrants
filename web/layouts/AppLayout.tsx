/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import {
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CalendarIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useWriteContract } from "wagmi";
import contract from "@/utilities/contract.json";
import { EthLogo } from "@/utilities/EthLogo";
import Link from "next/link";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import { usePopup } from "@/utilities/projectContext";
import Markdown from "react-markdown";

const product = {
  name: "Zip Tote Basket",
  price: "$220",
  rating: 3.9,
  href: "#",
  description:
    "The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg",
  imageAlt: "Back angled view with bag open and handles to the side.",
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppLayout: React.FC<{ children: React.ReactNode; title: any }> = ({
  children,
  title,
}) => {
  const { isOpen, popupData, togglePopupVisibility } = usePopup();
  const [currentTab, setCurrentTab] = useState("Project Details");
  const [tabs, setTabs] = useState([
    { name: "Project Details", current: true },
    { name: "Code Metrics", current: false },
    { name: "On-Chain Metrics", current: false },
  ]);
  const [projectData, setProjectData] = useState<any>({
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
  });
  const [projectOSOData, setProjectOSOData] = useState<any>({});
  const [projectOSODataLoading, setProjectOSODataLoading] = useState(false);
  const [contributeLoading, setContributeLoading] = useState(false);

  // Update current tab based on the currentTab state
  useEffect(() => {
    // update current tab based on the currentTab state
    setTabs((tabs) =>
      tabs.map((tab) => {
        if (tab.name === currentTab) {
          return {
            ...tab,
            current: true,
          };
        }
        return {
          ...tab,
          current: false,
        };
      })
    );
  }, [currentTab]);
  const { writeContract, isPending: isLoading, isSuccess, isError, error } = useWriteContract();
  const [amount, setAmount] = useState(0);
  const contribute = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setContributeLoading(true);
    console.log("Creating project...");
    try {
      // TODO: Make contract call to contribute to project
      writeContract({
        address: contract.address as `0x${string}`, // Replace with the actual contract address
        abi: contract.abi,
        functionName: "donate",
        args: [
          BigInt(0), // roundId
          BigInt(0), // projectId - replace with actual project ID
          BigInt(amount), // amount - replace with actual amount
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setContributeLoading(false);
    }
  };

  useEffect(() => {
    if (isError) {
      alert(error.message);
    }
  }, [isError, error]);

  // Getting project data from OSO
  useEffect(() => {
    const projectData = async () => {
      const res = await axios.get(`/api/proxy?projectId=${popupData}`);
      console.log(res.data);
      setProjectOSOData(res.data.data);
      setProjectOSODataLoading(false);
    };

    if (popupData) {
      projectData();
    }
  }, [popupData]);

  return (
    <div className="relative bg-gray-50">
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {/* Fake div to compensate height loss */}
      <div className="h-[84px] w-full" />
      <main className="isolate mx-auto max-w-7xl p-6 lg:px-8">
        <div>{children}</div>
      </main>
      <Footer />

      {/* Project popup start */}
      <Dialog
        open={isOpen}
        onClose={togglePopupVisibility}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in z-20"
        />

        <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-6xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div
                onClick={() => togglePopupVisibility(false)}
                className="absolute -top-4 -right-4 p-1 bg-white rounded-full z-40 hover:cursor-pointer"
              >
                <XCircleIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="w-full">
                <div>
                  <div>
                    <img
                      alt=""
                      src={projectData.projectCoverUrl}
                      className="h-32 w-full object-cover lg:h-48 rounded-xl"
                    />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          alt=""
                          src={projectData.projectLogoUrl}
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <div className="truncate text-3xl font-bold text-gray-900">
                            {projectData.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900">
                        {projectData.name}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="my-5 w-full border-b border-gray-200" />

                <div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex items-center gap-x-2">
                      <EthLogo />
                      {projectData.ownerAddress}
                    </div>
                    <div className="flex items-center gap-x-2">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      Created on: {projectData.createdDate}
                    </div>
                    <div className="flex items-center gap-x-2">
                      <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                      <Link href={projectData.website} target="_blank" passHref>
                        {projectData.website}
                      </Link>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <svg
                        fill="#9ca3af"
                        viewBox="0 0 24 24"
                        className="h-6 w-6"
                      >
                        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                      </svg>
                      <Link
                        href={projectData.twitterUrl}
                        target="_blank"
                        passHref
                      >
                        {projectData.twitterUrl}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="my-5 w-full border-b border-gray-200" />

                <div className="grid grid-cols-12 gap-x-10">
                  <div className="col-span-8">
                    {/* Tabs start */}
                    <div>
                      <div className="border-b border-gray-200">
                        <nav
                          aria-label="Tabs"
                          className="-mb-px flex space-x-8"
                        >
                          {tabs.map((tab) => (
                            <button
                              key={tab.name}
                              onClick={() => setCurrentTab(tab.name)}
                              className={classNames(
                                tab.current
                                  ? "border-primary-500 text-primary-600"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                              )}
                            >
                              {tab.name}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                    {/* Tabs end */}

                    {/* Project Details start */}
                    {currentTab === "Project Details" && (
                      <div>
                        <div className="mt-5 text-3xl font-medium">About</div>
                        <div className="mt-5 text-base">
                          {projectData.description}
                        </div>

                        <div className="mt-10 text-xl font-thin">
                          Additional Information
                        </div>

                        <div className="mt-5 text-base font-bold">
                          Funding Sources
                        </div>
                        <div className="mt-2 text-base font-normal">
                          {projectData.fundingSources}
                        </div>

                        <div className="mt-5 text-base font-bold">
                          Team Size
                        </div>
                        <div className="mt-2 text-base font-normal">
                          {projectData.teamSize}
                        </div>
                      </div>
                    )}
                    {/* Project Details end */}

                    {/* Code Metrics start */}
                    {currentTab === "Code Metrics" && (
                      <div>
                        {/* <div className="mt-5 text-xl font-thin">Code Metrics</div> */}

                        {!projectOSODataLoading && projectOSOData && (
                          <div className="grid grid-cols-2">
                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .activeDeveloperCount6Months && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Active Developers
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0]
                                          .activeDeveloperCount6Months
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .commitCount6Months && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Commits in the last 6 months
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0]
                                          .commitCount6Months
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .firstCommitDate && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    First Commit
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    {
                                      projectOSOData.oso_codeMetricsByProjectV1[0]
                                        .firstCommitDate
                                    }
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .lastCommitDate && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Last Commit
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    {
                                      projectOSOData.oso_codeMetricsByProjectV1[0]
                                        .lastCommitDate
                                    }
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .forkCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Fork Count
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0].forkCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .repositoryCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Repository Count
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0]
                                          .repositoryCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .starCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Star Count
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0].starCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_codeMetricsByProjectV1[0]
                              .contributorCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Contributors
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_codeMetricsByProjectV1[0]
                                          .contributorCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    )}
                    {/* Code Metrics end */}

                    {/* On-Chain Metrics start */}
                    {currentTab === "On-Chain Metrics" && (
                      <div>
                        {/* <div className="mt-5 text-xl font-thin">Code Metrics</div> */}

                        {!projectOSODataLoading && projectOSOData && (
                          <div className="grid grid-cols-2">
                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .activeContractCount90Days && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Active Contract Count (90 Days)
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .activeContractCount90Days
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .addressCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Address Count
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .addressCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .addressCount90Days && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Address Count (90 Days)
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .addressCount90Days
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .daysSinceFirstTransaction && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Days since last Transaction
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .daysSinceFirstTransaction
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .gasFeesSum && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Gas Fees Sum
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .gasFeesSum
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .returningAddressCount90Days && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Returning Address Count (90 Days)
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .returningAddressCount90Days
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .transactionCount && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Transaction Count
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .transactionCount
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}

                            {projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .transactionCount6Months && (
                                <div>
                                  <h1 className="mt-5 text-base font-light text-gray-500">
                                    Transaction Count (6 Months)
                                  </h1>
                                  <div className="mt-1 text-3xl font-medium">
                                    <NumericFormat
                                      value={
                                        projectOSOData
                                          .oso_onchainMetricsByProjectV1[0]
                                          .transactionCount6Months
                                      }
                                      displayType="text"
                                      thousandSeparator=","
                                    />
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    )}
                    {/* On-Chain Metrics end */}
                  </div>

                  {/* Contribute section start */}
                  <div className="col-span-4">
                    <div className="w-full bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-lg">
                      <div>
                        <section aria-labelledby="information-heading">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-3xl text-gray-900 font-medium">
                            {product.price}
                          </p>
                          <p>funding received in current round</p>

                          <p className="mt-6 text-3xl text-gray-900 font-medium">
                            {product.price}
                          </p>
                          <p>contributors</p>

                          <p className="mt-6 text-3xl text-gray-900 font-medium">
                            {product.price} months
                          </p>
                          <p>to go</p>
                        </section>

                        <div className="mt-6">
                          <div className="mb-4">
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                              Contribution Amount
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">$</span>
                              </div>
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                aria-describedby="amount-currency"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm" id="amount-currency">
                                  USD
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            onClick={contribute}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-8 py-3 text-base font-bold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                            {contributeLoading ? (
                              <>
                                <span>Donating</span>
                                <RotatingLines
                                  visible={true}
                                  width="20"
                                  strokeColor="#ffffff"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  ariaLabel="rotating-lines-loading"
                                />
                              </>
                            ) : (
                              <span>Contribute</span>
                            )}
                          </button>

                          <button
                            type="submit"
                            onClick={contribute}
                            className="mt-2 w-full flex items-center justify-center rounded-md border border-gray-400 bg-white px-8 py-3 text-base font-bold text-gray-900 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-gray-50"
                          >
                            {contributeLoading ? (
                              <>
                                <span>Creating Project</span>
                                <RotatingLines
                                  visible={true}
                                  width="20"
                                  strokeColor="#ffffff"
                                  strokeWidth="5"
                                  animationDuration="0.75"
                                  ariaLabel="rotating-lines-loading"
                                />
                              </>
                            ) : (
                              <span>Claim Rewards</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Contribute section end */}
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  onClick={() => togglePopupVisibility(false)}
                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border-2 border-gray-200 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Go back to dashboard
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* Project popup end */}
    </div>
  );
};

export default AppLayout;

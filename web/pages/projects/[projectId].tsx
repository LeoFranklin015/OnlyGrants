/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/router";
import {
  CalendarIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import AppLayout from "@/layouts/AppLayout";
import { EthLogo } from "@/utilities/EthLogo";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useState } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import { useWriteContract } from "wagmi";
import contract from "@/utilities/contract.json";

const profile = {
  name: "Ricardo Cooper",
  imageUrl:
    "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: "(555) 123-4567",
    Email: "ricardocooper@example.com",
    Title: "Senior Front-End Developer",
    Team: "Product Development",
    Location: "San Francisco",
    Sits: "Oasis, 4th floor",
    Salary: "$145,000",
    Birthday: "June 8, 1990",
  },
};

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

export default function Project() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("Project Details");
  const [tabs, setTabs] = useState([
    { name: "Project Details", current: true },
    { name: "Code Metrics", current: false },
    { name: "On-Chain Metrics", current: false },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      writeContract({
        address: contract.address as `0x${string}`, // Replace with the actual contract address
        abi: contract.abi,
        functionName: "donate",
        args: [
          BigInt(router.query.projectId as string), // roundId
          BigInt(1), // projectId - replace with actual project ID
          BigInt(100), // amount - replace with actual amount
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setContributeLoading(false);
    }
  };

  // Getting project data from OSO
  useEffect(() => {
    const projectData = async () => {
      const res = await axios.get(
        `/api/proxy?projectId=${router.query.projectId}`
      );
      console.log(res.data);
      setProjectOSOData(res.data.data);
      setProjectOSODataLoading(false);
    };

    if (router.query.projectId) {
      projectData();
    }
  }, [router.query.projectId]);

  return (
    <AppLayout title={router.query.projectId || ""}>
      <div className="w-full">
        <div>
          <div>
            <img
              alt=""
              src={profile.coverImageUrl}
              className="h-32 w-full object-cover lg:h-48 rounded-xl"
            />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  alt=""
                  src={profile.imageUrl}
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                />
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <div className="truncate text-3xl font-bold text-gray-900">
                    {profile.name}
                  </div>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="-ml-0.5 h-5 w-5 text-gray-400"
                    />
                    Message
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PhoneIcon
                      aria-hidden="true"
                      className="-ml-0.5 h-5 w-5 text-gray-400"
                    />
                    Call
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 className="truncate text-2xl font-bold text-gray-900">
                {profile.name}
              </h1>
            </div>
          </div>
        </div>

        <div className="my-5 w-full border-b border-gray-200" />

        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center gap-x-2">
              <EthLogo />
              0xD1F...f6Caa
            </div>
            <div className="flex items-center gap-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              Created on: July 16, 2024
            </div>
            <div className="flex items-center gap-x-2">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
              <Link
                href={`https://metaverse.career/home`}
                target="_blank"
                passHref
              >
                https://metaverse.career/home
              </Link>
            </div>
            <div className="flex items-center gap-x-2">
              <svg fill="#9ca3af" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
              <Link href={`https://x.com/metaverseai`} target="_blank" passHref>
                metaverseai
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
                <nav aria-label="Tabs" className="-mb-px flex space-x-8">
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
                <div className="mt-5 text-3xl font-medium">About ---</div>
                <div className="mt-5 text-base">
                  The Metaverse Career website allows anyone to list and find a
                  job in not only the Metaverse but also the web3 ecosystem as a
                  whole. Listings can be created for a small fee and will allow
                  your organization to find potential candidates for your
                  project in web3. Public good and Non-profit projects will be
                  able to create listings for free.
                </div>

                <div className="mt-10 text-xl font-thin">
                  Additional Information
                </div>

                <div className="mt-5 text-base font-bold">Funding Sources</div>
                <div className="mt-2 text-base font-normal">None</div>

                <div className="mt-5 text-base font-bold">Team Size</div>
                <div className="mt-2 text-base font-normal">1</div>
              </div>
            )}
            {/* Project Details end */}

            {/* Code Metrics start */}
            {currentTab === "Code Metrics" && (
              <div>
                {/* <div className="mt-5 text-xl font-thin">Code Metrics</div> */}

                {!projectOSODataLoading && projectOSOData && (
                  <div className="grid grid-cols-2">
                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Active Developers
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .activeDeveloperCount6Months
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .activeDeveloperCount6Months
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Commits in the last 6 months
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .commitCount6Months
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .commitCount6Months
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        First Commit
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        {projectOSOData.oso_codeMetricsByProjectV1[0]
                          .firstCommitDate || "N/A"}
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Last Commit
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        {projectOSOData.oso_codeMetricsByProjectV1[0]
                          .lastCommitDate || "N/A"}
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Fork Count
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .forkCount
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .forkCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Repository Count
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .repositoryCount
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .repositoryCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Star Count
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .starCount
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .starCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Contributors
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_codeMetricsByProjectV1[0]
                              .contributorCount
                              ? projectOSOData.oso_codeMetricsByProjectV1[0]
                                .contributorCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>
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
                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Active Contract Count (90 Days)
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .activeContractCount90Days
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .activeContractCount90Days
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Address Count
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .addressCount
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .addressCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Address Count (90 Days)
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .addressCount90Days
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .addressCount90Days
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Days since last Transaction
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .daysSinceFirstTransaction
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .daysSinceFirstTransaction
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Gas Fees Sum
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .gasFeesSum
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .gasFeesSum
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Returning Address Count (90 Days)
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .returningAddressCount90Days
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .returningAddressCount90Days
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Transaction Count
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .transactionCount
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .transactionCount
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="mt-5 text-base font-light text-gray-500">
                        Transaction Count (6 Months)
                      </h1>
                      <div className="mt-1 text-3xl font-medium">
                        <NumericFormat
                          value={
                            projectOSOData.oso_onchainMetricsByProjectV1[0]
                              .transactionCount6Months
                              ? projectOSOData.oso_onchainMetricsByProjectV1[0]
                                .transactionCount6Months
                              : 0
                          }
                          displayType="text"
                          thousandSeparator=","
                        />
                      </div>
                    </div>
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
    </AppLayout>
  );
}


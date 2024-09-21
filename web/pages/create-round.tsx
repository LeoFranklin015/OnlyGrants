"use client";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import DatePicker from "react-datepicker";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import contract from "../utilities/contract.json";


import AppLayout from "@/layouts/AppLayout";

import "react-datepicker/dist/react-datepicker.css";

const chains = [
  { id: 1, name: "Polygon" },
  { id: 2, name: "Mainnet" },
  { id: 3, name: "Flow testnet" },
  { id: 4, name: "Linea Sepolia" },
  { id: 5, name: "Rootstock testnet" },
];

export default function CreateRound() {
  const [selectedChain, setSelectedChain] = useState(chains[3]);
  const [createRoundLoading, setCreateRoundLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { writeContract } = useWriteContract();

  const handleCreateRound = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateRoundLoading(true);

    // Get form data
    const formData = new FormData(e.currentTarget);
    const roundData = {
      projectName: formData.get('projectName') as string,
      chain: selectedChain.name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      matchingPool: formData.get('matchingPool') as string,
      description: formData.get('description') as string,
    };

    try {
      const result = await writeContract({
        address: contract.address as `0x${string}`, // Replace with the actual contract address
        abi: contract.abi,
        functionName: "createRound",
        args: [
          parseEther(roundData.matchingPool), // Convert to wei
          roundData.description,
          BigInt(7 * 24 * 60 * 60), // Voting period in seconds (e.g., 7 days)
        ],
        value: parseEther(roundData.matchingPool), // Send the matching pool amount as value
      });

      console.log("Round created:", result);
      // Handle success (e.g., show a success message, redirect to the round page)
    } catch (error) {
      console.error("Error creating round:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setCreateRoundLoading(false);
    }
  };

  return (
    <AppLayout title="Projects">
      <div className="mx-auto my-16">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h1 className="text-3xl font-semibold leading-7 text-gray-900">
                Create a new Round
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <form
              onSubmit={handleCreateRound}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="projectName"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Project Name</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="projectName"
                        name="projectName"
                        type="text"
                        placeholder="What's the project name?"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    {/* Chain selection start */}
                    <Listbox value={selectedChain} onChange={setSelectedChain}>
                      <Label className="block text-xl font-medium leading-6 text-gray-900">
                        <h1>Project Development Network</h1>
                      </Label>
                      <div className="relative mt-2">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
                          <span className="block truncate">
                            {selectedChain.name}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              aria-hidden="true"
                              className="h-5 w-5 text-gray-400"
                            />
                          </span>
                        </ListboxButton>

                        <ListboxOptions
                          transition
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                        >
                          {chains.map((chain) => (
                            <ListboxOption
                              key={chain.id}
                              value={chain}
                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary-600 data-[focus]:text-white"
                            >
                              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                {chain.name}
                              </span>

                              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5"
                                />
                              </span>
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                    {/* Chain selection end */}
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="website"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Timeline</h1>
                    </label>
                    <div className="sm:mt-0 w-full grid grid-cols-2 gap-x-5">
                      <div className="mt-2">
                        <label
                          htmlFor="startDate"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Start Date
                        </label>
                        <div className="relative mt-2 sm:mt-0 w-full">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) =>
                              setStartDate(date || new Date())
                            }
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="endDate"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          End Date
                        </label>
                        <div className="relative mt-2 sm:col-span-2 sm:mt-0 sm:max-w-md">
                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date || new Date())}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="matchingPool"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Matching Pool (USDC)</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="matchingPool"
                        name="matchingPool"
                        type="number"
                        placeholder="Enter matching pool amount"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Round Description</h1>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about the Round.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {createRoundLoading ? (
                    <>
                      <span>Creating Round</span>
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
                    <span>Create Round</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

"use client";
import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { RotatingLines } from "react-loader-spinner";
import AppLayout from "@/layouts/AppLayout";

const chains = [
  { id: 1, name: "Polygon" },
  { id: 2, name: "Mainnet" },
  { id: 3, name: "Flow testnet" },
  { id: 4, name: "Linea Sepolia" },
  { id: 5, name: "Rootstock testnet" },
];

export default function CreateProject() {
  const [selectedChain, setSelectedChain] = useState(chains[3]);
  const [projectName, setProjectName] = useState("");
  const [osoName, setOsoName] = useState("");
  const [website, setWebsite] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [fundingSources, setFundingSources] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [createProjectLoading, setCreateProjectLoading] = useState(false);

  const createProject = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCreateProjectLoading(true);

    const projectData = {
      selectedChain: selectedChain.name,
      projectName,
      osoName,
      website,
      twitterUrl,
      logoUrl,
      coverUrl,
      fundingSources,
      teamSize,
      projectDescription,
    };

    console.log("Project Data:", JSON.stringify(projectData, null, 2));

    try {
      // Call the contract to create the project
      console.log("Project created successfully.");
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setCreateProjectLoading(false);
    }
  };

  return (
    <AppLayout title="Projects">
      <div className="mx-auto my-16">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h1 className="text-3xl font-semibold leading-7 text-gray-900">
                Create a new Project
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <form
              onSubmit={createProject}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="osoName"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Open Source Observer Name</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="osoName"
                        name="osoName"
                        type="text"
                        placeholder="What's the project name on Open Source Observer?"
                        value={osoName}
                        onChange={(e) => setOsoName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Other form fields follow a similar pattern */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="website"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Website</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="website"
                        name="website"
                        type="text"
                        placeholder="www.example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="twitterUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Twitter URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="twitterUrl"
                        name="twitterUrl"
                        type="text"
                        placeholder="What's the project Twitter profile URL?"
                        value={twitterUrl}
                        onChange={(e) => setTwitterUrl(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="logoUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Logo URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="logoUrl"
                        name="logoUrl"
                        type="text"
                        placeholder="What's the project logo URL?"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="coverUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Cover URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="coverUrl"
                        name="coverUrl"
                        type="text"
                        placeholder="What's the project cover URL?"
                        value={coverUrl}
                        onChange={(e) => setCoverUrl(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="sm:col-span-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-primary-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                      disabled={createProjectLoading}
                    >
                      {createProjectLoading ? (
                        <RotatingLines width="20" visible={true} />
                      ) : (
                        "Create Project"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// "use client";
// import { useState } from "react";
// import {
//   Label,
//   Listbox,
//   ListboxButton,
//   ListboxOption,
//   ListboxOptions,
// } from "@headlessui/react";
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// import { RotatingLines } from "react-loader-spinner";

// import AppLayout from "@/layouts/AppLayout";
// import axios from "axios";

// const chains = [
//   { id: 1, name: "Polygon" },
//   { id: 2, name: "Mainnet" },
//   { id: 3, name: "Flow testnet" },
//   { id: 4, name: "Linea Sepolia" },
//   { id: 5, name: "Rootstock testnet" },
// ];

// export default function CreateProject() {
//   const [selectedChain, setSelectedChain] = useState(chains[3]);
//   const [createProjectLoading, setCreateProjectLoading] = useState(false);

//   const createProject = (e: { preventDefault: () => void }) => {
//     e.preventDefault();
//     setCreateProjectLoading(true);
//     console.log("Creating project...");
//     try {
//       // TODO: Make contract call to create project
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setCreateProjectLoading(false);
//     }
//   };

//   const [projectOSOData, setProjectOSOData] = useState(null);

//   const projectData = async (projectName: string) => {
//     const res = await axios.get(`/api/proxy?projectId=${projectName}`);
//     console.log(res.data);
//     setProjectOSOData(res.data.data);
//   };

//   return (
//     <AppLayout title="Projects">
//       <div className="mx-auto my-16">
//         <div className="space-y-10 divide-y divide-gray-900/10">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
//             <div className="px-4 sm:px-0">
//               <h1 className="text-3xl font-semibold leading-7 text-gray-900">
//                 Create a new Project
//               </h1>
//               <p className="mt-3 text-sm leading-6 text-gray-600">
//                 This information will be displayed publicly so be careful what
//                 you share.
//               </p>
//             </div>

//             <form
//               onSubmit={createProject}
//               className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
//             >
//               <div className="px-4 py-6 sm:p-8">
//                 <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
//                   <div className="sm:col-span-4">
//                     {/* Chain selection start */}
//                     <Listbox value={selectedChain} onChange={setSelectedChain}>
//                       <Label className="block text-xl font-medium leading-6 text-gray-900">
//                         <h1>Project Development Network</h1>
//                       </Label>
//                       <div className="relative mt-2">
//                         <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6">
//                           <span className="block truncate">
//                             {selectedChain.name}
//                           </span>
//                           <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//                             <ChevronUpDownIcon
//                               aria-hidden="true"
//                               className="h-5 w-5 text-gray-400"
//                             />
//                           </span>
//                         </ListboxButton>

//                         <ListboxOptions
//                           transition
//                           className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
//                         >
//                           {chains.map((chain) => (
//                             <ListboxOption
//                               key={chain.id}
//                               value={chain}
//                               className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-primary-600 data-[focus]:text-white"
//                             >
//                               <span className="block truncate font-normal group-data-[selected]:font-semibold">
//                                 {chain.name}
//                               </span>

//                               <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
//                                 <CheckIcon
//                                   aria-hidden="true"
//                                   className="h-5 w-5"
//                                 />
//                               </span>
//                             </ListboxOption>
//                           ))}
//                         </ListboxOptions>
//                       </div>
//                     </Listbox>
//                     {/* Chain selection end */}
//                   </div>

//                   <div className="sm:col-span-4">
//                     <label
//                       htmlFor="email"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Project Name</h1>
//                     </label>
//                     <div className="mt-2 flex justify-between items-center">
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="Enter your OSO project name if available"
//                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
//                       />
//                       <button
//                         type="button"
//                         className="inline-flex items-center gap-x-2 ml-4 whitespace-nowrap bg-primary-600 px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition duration-300 ease-in-out"
//                         onClick={async () => await projectData("projectName")}
//                       >
//                         Fetch from OSO
//                       </button>
//                     </div>
//                   </div>

//                   {/* <div className="sm:col-span-4">
//                     <label
//                       htmlFor="email"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Open Source Observer Name</h1>
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="What's the project name on Open Source Observer?"
//                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                   </div> */}

//                   <div className="sm:col-span-4">
//                     <label
//                       htmlFor="website"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Website</h1>
//                     </label>
//                     <div className="mt-2">
//                       <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
//                         <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
//                           https://
//                         </span>
//                         <input
//                           id="website"
//                           name="website"
//                           type="text"
//                           placeholder="www.example.com"
//                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="sm:col-span-4">
//                     <label
//                       htmlFor="email"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Project Logo URL</h1>
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="What's the project name?"
//                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                   </div>

//                   <div className="sm:col-span-4">
//                     <label
//                       htmlFor="email"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Project Cover URL</h1>
//                     </label>
//                     <div className="mt-2">
//                       <input
//                         id="email"
//                         name="email"
//                         type="email"
//                         placeholder="What's the project name?"
//                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
//                       />
//                     </div>
//                   </div>

//                   <div className="col-span-full">
//                     <label
//                       htmlFor="about"
//                       className="block text-xl font-medium leading-6 text-gray-900"
//                     >
//                       <h1>Project Description</h1>
//                     </label>
//                     <div className="mt-2">
//                       <textarea
//                         id="about"
//                         name="about"
//                         rows={3}
//                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
//                         defaultValue={""}
//                       />
//                     </div>
//                     <p className="mt-3 text-sm leading-6 text-gray-600">
//                       Write a few sentences about the project.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
//                 <button
//                   type="button"
//                   className="text-sm font-semibold leading-6 text-gray-900"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
//                 >
//                   {createProjectLoading ? (
//                     <>
//                       <span>Creating Project</span>
//                       <RotatingLines
//                         visible={true}
//                         width="20"
//                         strokeColor="#ffffff"
//                         strokeWidth="5"
//                         animationDuration="0.75"
//                         ariaLabel="rotating-lines-loading"
//                       />
//                     </>
//                   ) : (
//                     <span>Create Project</span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </AppLayout>
//   );
// }

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
import axios from "axios";

const chains = [
  { id: 1, name: "Polygon" },
  { id: 2, name: "Mainnet" },
  { id: 3, name: "Flow testnet" },
  { id: 4, name: "Linea Sepolia" },
  { id: 5, name: "Rootstock testnet" },
];

export default function CreateProject() {
  const [selectedChain, setSelectedChain] = useState(chains[3]);
  const [createProjectLoading, setCreateProjectLoading] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [website, setWebsite] = useState("");
  const [projectLogoUrl, setProjectLogoUrl] = useState("");
  const [projectCoverUrl, setProjectCoverUrl] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectOSOData, setProjectOSOData] = useState(null);

  const createProject = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCreateProjectLoading(true);
    console.log("Creating project...", {
      projectName,
      website,
      projectLogoUrl,
      projectCoverUrl,
      projectDescription,
      selectedChain,
    });
    try {
      // TODO: Make contract call to create project
    } catch (error) {
      console.error(error);
    } finally {
      setCreateProjectLoading(false);
    }
  };

  const fetchProjectData = async (projectName: string) => {
    const res = await axios.get(`/api/proxy?projectId=${projectName}`);
    console.log(res.data);
    setProjectOSOData(res.data.data);
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
                This information will be displayed publicly, so be careful what
                you share.
              </p>
            </div>

            <form
              onSubmit={createProject}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {/* Chain selection start */}
                  <div className="sm:col-span-4">
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
                              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
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
                  </div>
                  {/* Chain selection end */}

                  {/* Project Name Field */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="projectName"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Project Name</h1>
                    </label>
                    <div className="mt-2 flex justify-between items-center">
                      <input
                        id="projectName"
                        name="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Enter your OSO project name if available"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 ml-4 whitespace-nowrap bg-primary-600 px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-primary-500 transition duration-300 ease-in-out"
                        onClick={async () =>
                          await fetchProjectData(projectName)
                        }
                      >
                        Fetch from OSO
                      </button>
                    </div>
                  </div>

                  {/* Website Field */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="website"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Website</h1>
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                          https://
                        </span>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="www.example.com"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Logo URL Field */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="projectLogoUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Project Logo URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="projectLogoUrl"
                        name="projectLogoUrl"
                        type="text"
                        value={projectLogoUrl}
                        onChange={(e) => setProjectLogoUrl(e.target.value)}
                        placeholder="Logo URL"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Project Cover URL Field */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="projectCoverUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Project Cover URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="projectCoverUrl"
                        name="projectCoverUrl"
                        type="text"
                        value={projectCoverUrl}
                        onChange={(e) => setProjectCoverUrl(e.target.value)}
                        placeholder="Cover URL"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* Project Description Field */}
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="projectDescription"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Project Description</h1>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="projectDescription"
                        name="projectDescription"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        placeholder="Provide a short description of your project"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 flex items-center gap-x-2 bg-primary-600 px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm hover:bg-primary-500 transition duration-300 ease-in-out"
                  disabled={createProjectLoading}
                >
                  {createProjectLoading && (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible
                    />
                  )}
                  <span>
                    {createProjectLoading ? "Creating..." : "Create Project"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

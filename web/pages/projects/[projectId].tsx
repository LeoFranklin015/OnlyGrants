/* eslint-disable @next/next/no-img-element */
"use client";
// import { useRouter } from "next/router";
import {
  CalendarIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import AppLayout from "@/layouts/AppLayout";
import { EthLogo } from "@/utilities/EthLogo";
import Link from "next/link";

export default function Project() {
  // const router = useRouter();

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

  return (
    <AppLayout title="Project">
      <div className="w-full">
        <div>
          <div>
            <img
              alt=""
              src={profile.coverImageUrl}
              className="h-32 w-full object-cover lg:h-48"
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

        <div className="my-12 w-full border-b border-gray-200" />

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

          {/* Project details start */}
          {/* Project details end */}

          {/* Project Impact Measurement start */}
          {/* Project Impact Measurement end */}
        </div>
      </div>
    </AppLayout>
  );
}

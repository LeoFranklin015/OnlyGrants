"use client";

import React from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppLayout: React.FC<{ children: React.ReactNode; title: any }> = ({
  children,
  title,
}) => {
  const [show, setShow] = useState(false);

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

      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => setShow(true)}
          className="px-5 py-3 flex items-center justify-center gap-x-2 bg-primary-600 rounded-full"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
          <span className="text-white font-semibold text-lg">OnlyChat</span>
        </button>
      </div>

      {/* Chat popup start */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end absolute bottom-5 right-5 z-50">
          <Transition show={show}>
            <div className="pointer-events-auto w-full h-[500px] max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4 relative">
                <div className="absolute right-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShow(false);
                    }}
                    className="p-1 inline-flex bg-white text-gray-400 border border-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      {/* Chat popup end */}
    </div>
  );
};

export default AppLayout;

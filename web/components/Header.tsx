'use client'

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WorldCoinConnect from "./WorldConnect";


// import { NearContext } from "@/utilities/context";
import { useEffect, } from "react";
const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Explore Rounds", href: "/rounds" },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { openConnectModal } = useConnectModal();

  // const { signedAccountId, wallet } = useContext(NearContext);
  // const [action, setAction] = useState(() => { });
  // const [label, setLabel] = useState("Loading...");

  // useEffect(() => {
  //   if (!wallet) return;

  //   if (signedAccountId) {
  //     setAction(() => wallet.signOut);
  //     setLabel(`Logout ${signedAccountId}`);
  //   } else {
  //     setAction(() => wallet.signIn);
  //     setLabel("Login");
  //   }
  // }, [signedAccountId, wallet]);

  const [worldcoinVerified, setWorldcoinVerified] = useState(false);

  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
    }
  }, [worldcoinVerified]);
  return (
    <header className="fixed w-full bg-white/70 top-0 z-10">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-x-2">
            <span className="sr-only">Your Company</span>
            <img alt="" src="/onlygrants-logo-2.png" className="h-8 w-auto" />
            <h1 className="text-3xl">OnlyGrants</h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        {!worldcoinVerified ? (
          <div className=" justify-center items-center">
            <WorldCoinConnect onAction={setWorldcoinVerified} />
          </div>
        ) : <div className="hidden items-center lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link

              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/create-round"
            className="inline-flex gap-x-2 rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Create Round
            <PlusIcon aria-hidden="true" className="-mr-0.5 h-5 w-5" />
          </Link>
        </div>
        }
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2">
          {/* Rainbowkit custom connect button start */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <button
                        onClick={openAccountModal}
                        className="rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                      >
                        {account.displayName}
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          {/* Rainbowkit custom connect button end */}

          {/* Near Login Button start */}
          {/* <button
            onClick={action}
            type="button"
            className="rounded-full bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {label}
          </button> */}
          {/* Near Login Button end */}


        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=primary&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;

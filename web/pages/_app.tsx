import "@/styles/globals.css";
import "@/styles/index.scss";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider, type Locale } from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { config } from "@/utilities/wagmi";
// import { NearContext } from "@/utilities/context";
// import { NetworkId, HelloNearContract } from "@/utilities/config";
// import { Wallet } from "@/utilities/near";

// const wallet = new Wallet({
//   networkId: NetworkId,
//   createAccessKeyFor: HelloNearContract,
// });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);
  const { locale } = useRouter() as { locale: Locale };

  useEffect(() => {
    setReady(true);
  }, []);

  // const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    // wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider locale={locale}>
              {/* <NearContext.Provider value={{ wallet, signedAccountId }}> */}
              <Component {...pageProps} />
              {/* </NearContext.Provider> */}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      ) : null}
    </>
  );
}

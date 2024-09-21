import React from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppLayout: React.FC<{ children: React.ReactNode; title: any }> = ({
  children,
  title,
}) => {
  return (
    <div className="bg-gray-50">
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
    </div>
  );
};

export default AppLayout;

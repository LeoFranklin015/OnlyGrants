"use client";
import BlockiesSvg from "blockies-react-svg";

import AppLayout from "@/layouts/AppLayout";

export default function Profile() {
  return (
    <AppLayout title="Projects">
      <div className="my-10">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <BlockiesSvg
            address="0x7B54...8edF13"
            size={8}
            scale={10}
            caseSensitive={false}
            className="h-10 w-10 rounded-md"
          />
          <div className="text-3xl font-medium">0x7B54...8edF13</div>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          * Please note that your recent transactions may take a short while to
          reflect in your donation history, as processing times may vary.
        </p>

        {/* Donation Impact Section */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="p-8 bg-gray-100 border border-gray-200 rounded-lg">
            <p className="text-4xl font-bold">$0.00</p>
            <p className="mt-3 font-semibold text-gray-500">Total Donations</p>
          </div>
          <div className="p-8 bg-gray-100 border border-gray-200 rounded-lg">
            <p className="text-4xl font-bold">$0.00</p>
            <p className="mt-3 font-semibold text-gray-500">Contributions</p>
          </div>
          <div className="p-8 bg-gray-100 border border-gray-200 rounded-lg">
            <p className="text-4xl font-bold">$0.00</p>
            <p className="mt-3 font-semibold text-gray-500">Projects Funded</p>
          </div>
        </div>

        {/* Donation History */}
        <div className="mt-14">
          <h2 className="text-3xl font-medium mb-4">Donation History</h2>

          {/* Active Rounds */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Active Rounds</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                Donations made during active rounds will appear here.
              </p>
            </div>
          </div>

          {/* Past Rounds */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Past Rounds</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                Donations made during past rounds will appear here.
              </p>
            </div>
          </div>

          {/* Direct Donations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Direct Donations</h3>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                Direct donations made to projects will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

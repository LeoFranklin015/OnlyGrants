"use client";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import AppLayout from "@/layouts/AppLayout";

export default function CreateRound() {
  const [createProfileLoading, setCreateProfileLoading] = useState(false);
  const [name, setName] = useState(""); // State for 'Your Name'
  const [profilePictureUrl, setProfilePictureUrl] = useState(""); // State for 'Profile Picture URL'
  const [twitterProfileUrl, setTwitterProfileUrl] = useState(""); // State for 'Twitter Profile URL'
  const [farcasterProfileUrl, setFarcasterProfileUrl] = useState(""); // State for 'Farcaster Profile URL'
  const [about, setAbout] = useState(""); // State for 'About'

  const createProfile = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCreateProfileLoading(true);
    console.log("Creating profile...");
    try {
      // TODO: Make contract call to create profile
      const metadata = {
        name,
        profilePictureUrl,
        twitterProfileUrl,
        farcasterProfileUrl,
        about,
      };

      const data = JSON.stringify(metadata);
      console.log("Profile data:", data);
      // Call create Profile
    } catch (error) {
      console.error(error);
    } finally {
      setCreateProfileLoading(false);
    }
  };

  return (
    <AppLayout title="Projects">
      <div className="mx-auto my-16">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h1 className="text-3xl font-semibold leading-7 text-gray-900">
                Create your Profile
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <form
              onSubmit={createProfile}
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Your Name</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Real Slim Shady"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="profilePictureUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Profile Picture URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="profilePictureUrl"
                        name="profilePictureUrl"
                        type="text"
                        value={profilePictureUrl}
                        onChange={(e) => setProfilePictureUrl(e.target.value)}
                        placeholder="https://your-profile-pic-url.jpg"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="twitterProfileUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Twitter Profile URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="twitterProfileUrl"
                        name="twitterProfileUrl"
                        type="text"
                        value={twitterProfileUrl}
                        onChange={(e) => setTwitterProfileUrl(e.target.value)}
                        placeholder="https://twitter.com/your-profile"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="farcasterProfileUrl"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>Farcaster Profile URL</h1>
                    </label>
                    <div className="mt-2">
                      <input
                        id="farcasterProfileUrl"
                        name="farcasterProfileUrl"
                        type="text"
                        value={farcasterProfileUrl}
                        onChange={(e) => setFarcasterProfileUrl(e.target.value)}
                        placeholder="https://farcaster.xyz/your-profile"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      <h1>About</h1>
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                        placeholder="Write a few sentences about yourself"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
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
                  {createProfileLoading ? (
                    <>
                      <span>Creating Profile</span>
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
                    <span>Create Profile</span>
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

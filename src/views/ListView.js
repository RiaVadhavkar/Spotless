import { Disclosure } from "@headlessui/react";
import user_profile from "../assets/users/ashley.jpeg";

export default function ListView() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
        {/* Banner */}
          <div class="banner" className="bg-spotless-dark-green h-36"></div>
          {/* Main Page */}
          <div className="relative flex h-auto items-center justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {/* User Profile */}
            <section
              class="user-profile"
              className="bg-neutral-900 rounded-2xl h-max w-64 -translate-y-16 flex flex-col items-center justify-center"
            >
              <img
                className="h-44 mt-5 rounded-full w-auto lg:block"
                src={user_profile}
                alt="Spotless User"
              />
              <h1 class="username" className="mt-6 text-3xl font-bold">
                ashley
              </h1>
              <h2 class="social-stats" className="mt-2.5 text-sm font-bold">
                6 followers&nbsp;|&nbsp;18 following
              </h2>
              <section
                class="minutes-listened"
                className="flex flex-col mt-6 text-sm items-center justify-center"
              >
                Total Minutes Listened
                <h1 class="minutes" className="text-2xl text-spotless-green">
                  128,936
                </h1>
              </section>
              <section
                class="genre-overview"
                className="flex flex-col text-sm mb-6 mt-2.5 w-full justify-center items-center"
              >
                Top Genre Overview
                <div
                  class="genre-pill-graph"
                  className="flex flex-row text-black text-xs w-11/12 mt-2.5"
                >
                  <div class="w-1/2 bg-white rounded-l-full p-0.5">&nbsp;&nbsp;&nbsp;pop</div>
                  <div class="w-1/4 bg-spotless-dark-green p-0.5">&nbsp;hip-hop</div>
                  <div class="w-1/4 bg-spotless-green rounded-r-full p-0.5">&nbsp;rock</div>
                </div>
              </section>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

import { Fragment, useState, useRef } from "react";
import { Disclosure, Tab, Menu, Transition, Dialog } from "@headlessui/react";
import { BsSearch, BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge } from "react-icons/fa";
import user_profile from "../assets/users/ashley.jpeg";
import axios from "axios";


export default function ListView() {
  let [isOpen, setIsOpen] = useState(false);

  const spotifyURL = useRef("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function addURLtoList(URL) {
    const api = 'https://spotless-test-api.discovery.cs.vt.edu/'

    axios.post(api + 'spotify/album', {
      collection_url: URL
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <Disclosure as="body" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
          {/* Banner */}
          <div class="banner" className="bg-spotless-dark-green h-36"></div>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {/* Left Side */}
            <section className="flex flex-col">
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
                    <div class="w-1/2 bg-white rounded-l-full p-0.5">
                      &nbsp;&nbsp;&nbsp;pop
                    </div>
                    <div class="w-1/4 bg-spotless-dark-green p-0.5">
                      &nbsp;hip-hop
                    </div>
                    <div class="w-1/4 bg-spotless-green rounded-r-full p-0.5">
                      &nbsp;rock
                    </div>
                  </div>
                </section>
              </section>
              {/* Add Collection Button */}
              <button
                class="add-collection-button"
                className="bg-spotless-dark-green font-bold ring ring-white -translate-y-8 p-2.5 rounded-full h-auto w-64 flex flex-col items-center justify-center"
                onClick={openModal}
              >
                Add Collection
              </button>

              {/* TODO BEGIN */}
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Add Album to List
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              'Copy Album Link' from Spotify
                            </p>
                            <form onSubmit={addURLtoList(spotifyURL.current.value)}>
                              <label>
                                Album URL
                                <input id='link' ref={spotifyURL} type="text" />
                              </label>
                            </form>
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Done
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              {/* TODO END */}
            </section>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 mt-5">
              {/* List Nav Bar */}
              <section class="flex flex-row items-center justify-between">
                {/* Search */}
                <section
                  class="search-list"
                  className="bg-neutral-900 flex flex-row w-44 items-center justify-center rounded-full py-2.5"
                >
                  <BsSearch className="h-4 w-4" aria-hidden="true" />
                  &nbsp;&nbsp;Name
                </section>

                {/* Status Tabs */}
                <section
                  class="status-tabs"
                  className="bg-neutral-900 rounded-full py-2.5 gap"
                >
                  <Tab.Group>
                    <Tab.List className="space-x-2 px-4">
                      <Tab>Listened</Tab>
                      <Tab>Planning</Tab>
                      <Tab>Dropped</Tab>
                    </Tab.List>
                  </Tab.Group>
                </section>

                {/* Sort By Menu */}
                <section
                  class="sort-by-menu"
                  className="rounded-full py-2.5 items-center justify-center"
                >
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="inline-flex w-full justify-center items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <BsFillCaretDownFill
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      &nbsp;Sort By
                    </Menu.Button>

                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>Name</Menu.Item>
                        <Menu.Item>Rating</Menu.Item>
                        <Menu.Item>Year</Menu.Item>
                        <Menu.Item>Type</Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </section>

                {/* Switch Views */}
                <section
                  class="switch-views"
                  className="flex flex-row bg-neutral-900 rounded-full py-2.5"
                >
                  <FaList className="h-6 w-6" aria-hidden="true" />
                  <FaThLarge className="h-6 w-6" aria-hidden="true" />
                </section>
              </section>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

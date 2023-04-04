import { Disclosure, Tab, Menu, Transition } from "@headlessui/react";
import { BsSearch, BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge } from "react-icons/fa";

export default function ListNavigation() {
  return (
    <Disclosure as="list-navigation" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
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
                  <BsFillCaretDownFill className="h-4 w-4" aria-hidden="true" />
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
        </>
      )}
    </Disclosure>
  );
}

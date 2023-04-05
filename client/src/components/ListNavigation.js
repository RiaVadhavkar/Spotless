import { Disclosure, Tab, Menu, Transition } from "@headlessui/react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge, FaSearch } from "react-icons/fa";

export default function ListNavigation() {
  return (
    <Disclosure as="list-navigation" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
          {/* List Nav Bar */}
          <section class="flex flex-row items-center justify-between">
            {/* Search */}
            <section
              className="search-list"
              class="bg-neutral-900 flex flex-row w-52 items-center justify-center rounded-2xl py-2.5 gap-1.5 mx-1.5"
            >
              <FaSearch class="h-4 w-4" aria-hidden="true" />
              <span class="opacity-80">Name</span>
            </section>

            {/* Status Tabs */}
            <section
              className="status-tabs"
              class="bg-neutral-900 rounded-2xl py-2.5 grow mx-1.5"
            >
              <Tab.Group>
                <Tab.List className="flex space-x-2 px-4 grow justify-around items-center">
                  <Tab>Listened</Tab>
                  <Tab>Planning</Tab>
                  <Tab>Dropped</Tab>
                </Tab.List>
              </Tab.Group>
            </section>

            {/* Sort By Menu */}
            <section
              className="sort-by-menu"
              class="bg-neutral-900 text-white rounded-2xl py-2.5 px-4 mx-1.5 h-full"
            >
              <Menu as="div">
                <Menu.Button className="inline-flex gap-1.5 justify-center items-center">
                  Sort By
                  <BsFillCaretDownFill className="h-4 w-4" aria-hidden="true" />
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
              className="switch-views"
              class="flex flex-row bg-neutral-900 rounded-2xl py-3 gap-3.5 items-center justify-center w-fit h-full px-4 mx-1.5"
            >
              <FaList className="h-5 w-5" aria-hidden="true" />
              <FaThLarge className="h-5 w-5" aria-hidden="true" />
            </section>
          </section>
        </>
      )}
    </Disclosure>
  );
}

import { Disclosure, Tab, Menu, Transition, Listbox } from "@headlessui/react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge, FaSearch } from "react-icons/fa";
import { useState, useContext } from "react";
import { SessionContext } from "../App";

export default function ListNavigation(props) {
  const {
    albums,
    setAlbums,
    handleSort,
    sorts,
    selectedSort,
    handleFilter,
  } = useContext(SessionContext);

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
              <Tab.Group
                onChange={(index) => handleFilter(index)}
              >
                <Tab.List className="flex space-x-2 px-4 grow justify-around items-center">
                  <Tab>All</Tab>
                  <Tab>Planning</Tab>
                  <Tab>Completed</Tab>
                  <Tab>Dropped</Tab>
                </Tab.List>
              </Tab.Group>
            </section>

            {/* Sort By Menu */}
            <section
              className="sort-by-menu"
              class="bg-neutral-900 text-white rounded-2xl py-2.5 px-4 mx-1.5 h-full"
            >
              <select
                id="sort"
                onChange={(e) => handleSort(e.target.value)}
                defaultValue={selectedSort}
                class="text-spotless-green rounded font-bold p-1"
              >
                {sorts.map((sort) => (
                  <option key={sort} value={sort}>
                    {sort}
                  </option>
                ))}
              </select>
            </section>

            {/* Switch Views */}
            <section
              className="switch-views"
              class="flex flex-row bg-neutral-900 rounded-2xl py-3 gap-3.5 items-center justify-center w-fit h-full px-4 mx-1.5"
            >
              <FaList
                class="h-5 w-5"
                aria-hidden="true"
                onClick={props.toggle}
              />
              <FaThLarge
                class="h-5 w-5"
                aria-hidden="true"
                onClick={props.toggle}
              />
            </section>
          </section>
        </>
      )}
    </Disclosure>
  );
}

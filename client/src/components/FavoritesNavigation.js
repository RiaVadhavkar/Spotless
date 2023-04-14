import { Disclosure, Tab, Menu, Transition } from "@headlessui/react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge, FaSearch } from "react-icons/fa";

export default function FavoritesNavigation() {
  return (
    <Disclosure as="list-navigation" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
          {/* Favorites Nav Bar */}
          <section
            className="collection-type-tabs"
            class="flex items-center justify-center"
          >
            <Tab.Group class="flex items-center justify-around bg-neutral-900 rounded-2xl py-2.5 w-3/5">
              <Tab.List className="flex space-x-2 px-4 grow justify-around items-center">
                <Tab>Album</Tab>
                <Tab>Single/EP</Tab>
                <Tab>Compilation</Tab>
              </Tab.List>
            </Tab.Group>
          </section>
        </>
      )}
    </Disclosure>
  );
}

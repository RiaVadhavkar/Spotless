import { Disclosure, Tab, Menu, Transition } from "@headlessui/react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FaList, FaThLarge, FaSearch } from "react-icons/fa";

export default function SocialNavigation() {
  return (
    <Disclosure as="list-navigation" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
          {/* Social Nav Bar */}
          <section
            className="collection-type-tabs"
            class="flex items-center justify-center"
          >
            <Tab.Group class="flex items-center justify-around bg-neutral-900 rounded-2xl py-2.5 w-1/2">
              <Tab.List className="flex space-x-2 px-4 grow justify-around items-center">
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
              </Tab.List>
            </Tab.Group>
          </section>
        </>
      )}
    </Disclosure>
  );
}

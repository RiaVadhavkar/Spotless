import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsPersonFill } from "react-icons/bs";

function Footer() {
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              {/* Login/Logout Button */}
              <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
                <button
                  type="button"
                  className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                  <BsPersonFill className="h-6 w-6" aria-hidden="true" />
                  &nbsp;
                  <span className="text-xl font-semibold">LOGOUT</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Footer;

import logo from "../assets/logo.png";
import { Disclosure } from "@headlessui/react";

export default function HeaderStart() {
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="relative flex h-20 items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {/* Logo and Name */}
            <section className="flex auto items-center justify-center sm:items-stretch sm:justify-start">
              <img className="h-12 w-auto lg:block" src={logo} alt="Spotless" />
              &nbsp;
              <span class="text-spotless-green text-5xl font-semibold">
                Spot
              </span>
              <span class="text-white text-5xl font-semibold">less</span>
            </section>

            {/* Login/Logout Button */}
            <section className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
              <button
                type="button"
                className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <span className="text-xl font-semibold">SIGN UP / LOGIN</span>
              </button>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

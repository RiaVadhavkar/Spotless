import logo from "../assets/logo.png";
import { Disclosure } from "@headlessui/react";

export default function HeaderRegistration() {
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
          </div>
        </>
      )}
    </Disclosure>
  );
}

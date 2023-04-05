import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import RegistrationBox from "../components/RegistrationBox";

export default function Settings() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <div className="relative flex flex-col h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div
              className="home=page-box"
              class="flex justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded mb-14"
            >
              <button
                type="submit"
                class="text-white bg-red-600 px-6 py-2.5 rounded-full text-3xl"
              >
                Delete Profile
              </button>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

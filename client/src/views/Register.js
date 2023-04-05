import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import RegistrationBox from "../components/RegistrationBox";

export default function Home() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <div className="relative flex flex-col h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <RegistrationBox></RegistrationBox>
          </div>
        </>
      )}
    </Disclosure>
  );
}

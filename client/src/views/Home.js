import { Disclosure } from "@headlessui/react";
import HomeBox from "../components/HomeBox";

export default function Home() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white">
      {({ open }) => (
        <>
          <div className="relative flex h-auto items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <HomeBox></HomeBox>
          </div>
        </>
      )}
    </Disclosure>
  );
}

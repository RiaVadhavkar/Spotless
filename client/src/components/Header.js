import { Disclosure } from "@headlessui/react";
import Brand from "./Brand";
import ProfileButton from "./ProfileButton";
import Navigation from "./Navigation";

export default function Header() {
  const profileButtonText = "LOGOUT";
  return (
    <Disclosure as="header" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="relative flex h-20 items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Brand></Brand>
            <Navigation></Navigation>
            <ProfileButton build={profileButtonText}></ProfileButton>
          </div>
        </>
      )}
    </Disclosure>
  );
}

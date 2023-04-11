import { Disclosure } from "@headlessui/react";
import Brand from "./Brand";
import ProfileButton from "./ProfileButton";
import ProfileButtonLogout from "./ProfileButtonLogout";
import Navigation from "./Navigation";
import { SessionContext } from "../App";
import { useContext } from "react";

export default function Header() {
  const { sessionToken } = useContext(SessionContext);
  return (
    <Disclosure as="header" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="relative flex h-20 items-center justify-between mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Brand></Brand>
            { (sessionToken) ? <Navigation></Navigation> : null }
            { (sessionToken ? <ProfileButtonLogout></ProfileButtonLogout> : <ProfileButton></ProfileButton>)}
          </div>
        </>
      )}
    </Disclosure>
  );
}

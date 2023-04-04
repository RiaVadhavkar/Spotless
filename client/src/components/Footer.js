import { Disclosure } from "@headlessui/react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { FaTiktok, FaYoutube, FaDiscord } from "react-icons/fa";

export default function Footer() {
  return (
    <Disclosure as="footer" className="bg-neutral-900 text-white">
      {({ open }) => (
        <>
          <div className="relative flex h-12 items-center justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {/* Socials */}
            <section className="flex auto items-center justify-center gap-5">
              <BsFacebook
                className="h-6 w-6 hover:text-facebook-blue"
                aria-hidden="true"
              />
              <BsTwitter
                className="h-6 w-6 hover:text-twitter-blue"
                aria-hidden="true"
              />
              <BsInstagram
                className="h-6 w-6 hover:text-instagram-purple"
                aria-hidden="true"
              />
              <FaTiktok className="h-6 w-6" aria-hidden="true" />
              <FaYoutube
                className="h-6 w-6 hover:text-youtube-red"
                aria-hidden="true"
              />
              <FaDiscord
                className="h-6 w-6 hover:text-discord-purple"
                aria-hidden="true"
              />
            </section>

            {/* Copyright */}
            <section className="flex auto items-center justify-center">
              <div className="">
                About&nbsp;|&nbsp;Contact&nbsp;|&nbsp;&copy; 2023 Spotless. All
                Rights Reserved.
              </div>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

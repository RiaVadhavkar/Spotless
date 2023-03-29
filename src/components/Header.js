import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BsPersonFill } from "react-icons/bs";
import logo from "../assets/logo.png";

// <script src="https://kit.fontawesome.com/a362661c96.js" crossorigin="anonymous">
// </script>
const navigation = [
  { name: "List", href: "#", current: true }, // TODO fix highlighting
  { name: "Favorites", href: "#", current: false },
  { name: "Stats", href: "#", current: false },
  { name: "Social", href: "#", current: false },
  { name: "Settings", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function HeaderStart() {
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* For MOBILE DEVICES */}
              {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}

              {/* Logo and Name */}
              <div className="flex auto items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                  <img
                    className="h-12 w-auto lg:block"
                    src={logo}
                    alt="Spotless"
                  />
                  &nbsp;
                  <span class="text-spotless-green text-5xl font-semibold">
                    Spot
                  </span>
                  <span class="text-white text-5xl font-semibold">less</span>
                </div>
              </div>

              {/* Navigation */}
              {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div> */}

              {/* Login/Logout Button */}
              <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
                <button
                  type="button"
                  className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
                >
                  <span className="text-xl font-semibold">SIGN UP / LOGIN</span>
                </button>

                {/* Profile Dropdown */}
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}

function HeaderRegistration() {
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex auto items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center">
                  <img
                    className="h-12 w-auto lg:block"
                    src={logo}
                    alt="Spotless"
                  />
                  &nbsp;
                  <span class="text-spotless-green text-5xl font-semibold">
                    Spot
                  </span>
                  <span class="text-white text-5xl font-semibold">less</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

function Header() {
  return (
    <Disclosure as="nav" className="bg-neutral-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Logo and Name */}
              <div className="flex auto items-center justify-center sm:items-stretch sm:justify-start">
                <img
                  className="h-12 w-auto lg:block"
                  src={logo}
                  alt="Spotless"
                />
                &nbsp;
                <span class="text-spotless-green text-5xl font-semibold">
                  Spot
                </span>
                <span class="text-white text-5xl font-semibold">less</span>
              </div>

              {/* Navigation */}
              <div className="flex grow items-center justify-evenly">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "underline underline-offset-8 decoration-2 decoration-spotless-green"
                        : "hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-spotless-green",
                      "text-white px-3 py-2 text-xl font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

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

export default Header;

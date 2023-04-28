import { Disclosure } from "@headlessui/react";
import { useEffect, useContext } from "react";
import { SessionContext } from "../App";

const navigationAdmin = [
  { name: "List", href: "/list" },
  // { name: "Favorites", href: "/favorites"},
  { name: "Stats", href: "/stats" },
  // { name: "Social", href: "/social"},
  { name: "Admin", href: "/admin" },
  { name: "Settings", href: "/settings" },
];

const navigationNonAdmin = [
  { name: "List", href: "/list" },
  // { name: "Favorites", href: "/favorites"},
  { name: "Stats", href: "/stats" },
  // { name: "Social", href: "/social"},
  { name: "Settings", href: "/settings" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const { admin } = useContext(SessionContext);

  useEffect (() => {
    console.log("admin: " + admin);
  }, [admin]);
  const currentPath = window.location.pathname;
  // const admin = sessionStorage.getItem("admin");
  // console.log("current path: " + currentPath);
  // console.log("storage: " + sessionStorage);
  // console.log("is an admin??" + admin);

  const adminCondition = (admin === "true") ? true : false;

  const navigation = [
    ...(adminCondition ? navigationAdmin : navigationNonAdmin),
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-neutral-900 flex grow items-center justify-evenly"
    >
      {({ open }) => (
        <>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                currentPath === item.href
                  ? "underline underline-offset-8 decoration-2 decoration-spotless-green"
                  : "hover:underline hover:underline-offset-8 hover:decoration-2 hover:decoration-spotless-green",
                "text-white px-3 py-2 text-xl font-medium"
              )}
            >
              {item.name}
            </a>
          ))}
        </>
      )}
    </Disclosure>
  );
}

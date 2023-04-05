import { Disclosure } from "@headlessui/react";

const navigation = [
  { name: "List", href: "/list", current: false },
  { name: "Favorites", href: "/favorites", current: false },
  { name: "Stats", href: "/stats", current: false },
  { name: "Social", href: "/social", current: false },
  { name: "Settings", href: "/settings", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
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
        </>
      )}
    </Disclosure>
  );
}

import logo from "../assets/logo.png";
import { Disclosure } from "@headlessui/react";
import { BsPersonFill } from "react-icons/bs";

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

// let [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

// constructor: {
//   super();
//   this.state = {
//     username: null,
//     password: null
//   };
//   this.register = this.register.bind(this);
//   this.handleChange = this.handleChange.bind(this);
// }

//  handleChange(target) {
//   this.setState({
//     [target.name]: target.value
//   });
// }

// register: {
//   console.log( this.state.topicBox, this.state.payloadBox );
// }

export default function Header() {
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

            {/* Navigation */}
            <section className="flex grow items-center justify-evenly">
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
            </section>

            {/* Login/Logout Button */}
            <section className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
              <button
                type="button"
                className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
              >
                <BsPersonFill className="h-6 w-6" aria-hidden="true" />
                &nbsp;
                <span className="text-xl font-semibold">LOGOUT</span>
              </button>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

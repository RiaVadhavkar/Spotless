import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import FavoritesNavigation from "../components/FavoritesNavigation";
import TableItem from "../components/TableItem";

export default function Favorites() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-screen">
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 mt-5">
              {/* List Nav Bar */}
              <FavoritesNavigation></FavoritesNavigation>
              <div
                className="table-items"
                class="grid grid-cols-2 items-center justify-items-center"
              >
                <TableItem></TableItem>
                <TableItem></TableItem>
                <TableItem></TableItem>
                <TableItem></TableItem>
              </div>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

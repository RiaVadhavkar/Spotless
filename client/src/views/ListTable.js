import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import ListNavigation from "../components/ListNavigation";
import TableItem from "../components/TableItem";

export default function ListTable() {
  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-full items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 mt-5">
              {/* List Nav Bar */}
              <ListNavigation></ListNavigation>
              <div className="table-items" class="grid grid-cols-2 items-center justify-items-center">
                <TableItem></TableItem>
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

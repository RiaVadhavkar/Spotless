import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import { useContext, useEffect } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import AdminTextStats from "../components/AdminTextStats";
import AdminCollectionByYear from "../components/AdminCollectionByYear";

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      console.log("Not logged in");
      navigate("/login");
    }
  }, []);

  return (
    <Disclosure
      as="body"
      className="bg-spotless-green text-white h-full overflow-y-scroll no-scrollbar"
    >
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 my-5">
              {/* List Nav Bar */}
              <AdminTextStats></AdminTextStats>
              <AdminCollectionByYear></AdminCollectionByYear>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import SocialNavigation from "../components/SocialNavigation";
import SocialItem from "../components/SocialItem";
import { useContext, useEffect } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Social() {
  const { sessionUsername, sessionToken } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!sessionToken || !sessionUsername) {
    //   console.log("Not logged in");
    //   navigate("/login");
    // }
  }, [sessionToken, sessionUsername]);
  
  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 mt-5">
              {/* List Nav Bar */}
              <SocialNavigation></SocialNavigation>
              <div
                className="table-items"
                class="grid grid-cols-3 items-center justify-items-center"
              >
                <SocialItem></SocialItem>
                <SocialItem></SocialItem>
                <SocialItem></SocialItem>
                <SocialItem></SocialItem>
              </div>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

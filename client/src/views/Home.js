import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import HomeBox from "../components/HomeBox";
import { useContext, useEffect } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { sessionUsername, sessionToken } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect( () => {
    if (sessionToken && sessionUsername) {
      navigate("/list");
    }
  }, [sessionToken, sessionUsername]);

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <div className="relative flex flex-col h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Link to="/register">
              <button class="bg-white text-spotless-green px-8 py-3 rounded-full text-4xl translate-y-8">
                Listen Now
              </button>
            </Link>

            <HomeBox></HomeBox>
          </div>
        </>
      )}
    </Disclosure>
  );
}

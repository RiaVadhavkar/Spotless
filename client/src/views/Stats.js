import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import BarPie from "../components/BarPie";
import ReleaseYearGraph from "../components/ReleaseYearGraph";
import TextStats from "../components/TextStats";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Stats() {
  const navigate = useNavigate();
  const { sessionUsername, sessionToken } = useContext(SessionContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      console.log("Not logged in");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (sessionUsername && sessionToken) {
      getUserStats();
    }
  }, [sessionUsername, sessionToken]);

  async function getUserStats() {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    await axios
      .get(api + "user/stats", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then(function (response) {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full overflow-y-scroll no-scrollbar">
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 my-5">
              {/* List Nav Bar */}
              <TextStats></TextStats>
              <BarPie></BarPie>
              <ReleaseYearGraph></ReleaseYearGraph>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

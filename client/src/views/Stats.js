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
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    console.log("userData start");
    console.log(userData);
    if (
      userData &&
      userData.collection_by_status &&
      userData.collections_by_rating &&
      userData.collections_by_year &&
      userData.minutes_collection_complete &&
      userData.minutes_collection_full &&
      userData.minutes_collection_planned
    ) {
      setLoaded(true);
      console.log("userData end");
      console.log(userData);
    }
  }, [userData]);

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
              {loaded ? (
                <div>
                  <TextStats stats={userData}></TextStats>
                  <BarPie stats={userData}></BarPie>
                  <ReleaseYearGraph stats={userData}></ReleaseYearGraph>
                </div>
              ) : (
                <div class="flex justify-center items-center rounded-2xl h-96 bg-neutral-900 text-white text-2xl">
                  Statistics Loading&nbsp;...
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

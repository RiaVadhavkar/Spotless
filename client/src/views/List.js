import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import ListNavigation from "../components/ListNavigation";
import ListItem from "../components/ListItem";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import axios from "axios";

export default function List() {
  const { sessionUsername, sessionToken } = useContext(SessionContext);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    axios.get(api + "/" + sessionUsername + "/collection",
     { withCredentials: true, headers: { Authorization: `Bearer ${sessionToken}` } })
     .then(function (response) {
        console.log(response.data);
        setAlbums(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [sessionUsername, sessionToken]);

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
              <ListNavigation></ListNavigation>
              <ListItem></ListItem>
            </section>
          </div>
        </>
      )}
    </Disclosure>
  );
}

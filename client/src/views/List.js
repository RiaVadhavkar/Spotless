import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import ListNavigation from "../components/ListNavigation";
import ListItem from "../components/ListItem";
import { useContext, useEffect } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function List() {
  const navigate = useNavigate();
  const { sessionUsername, sessionToken, albums, getAlbums, albumsLength } = useContext(SessionContext);

  useEffect(() => {
    if (sessionUsername && sessionToken) {
      getAlbums();
    }
    else {
      console.log("Not logged in");
      navigate("/login");
    }
  }, [sessionUsername, sessionToken, albumsLength]);

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
              {/* List Items */}
              { (albums.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <h1 className="text-4xl font-bold">No Albums in Collection</h1>
                  <h1 className="text-4xl font-bold">Add Some!</h1>
                  </div>
                  ) : (
                    <></>
                  )}
              {albums.map((album) => {
                  return (
                    <ListItem
                      key={album.Collection_URI}
                      album={album}
                    ></ListItem>
                  );
                })}
            </section>
          </div>
        </>
      )}  
    </Disclosure>
  );
}

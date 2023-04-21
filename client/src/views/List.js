import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import ListNavigation from "../components/ListNavigation";
import ListItem from "../components/ListItem";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import TableItem from "../components/TableItem";

export default function List() {
  const navigate = useNavigate();
  const { sessionUsername, sessionToken, albums, getAlbums, albumsLength } = useContext(SessionContext);

  const [listView, setListView] = useState(true);

  const handleToggle = () => {
    setListView(!listView);
  };

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
      getAlbums();
    }
  }, [sessionUsername, sessionToken ,albumsLength]);

  const listItems = albums.map((album) => {
    return (
      <ListItem
        key={album.Collection_URI}
        album={album}
      ></ListItem>
    );
  });

  const tableItems = albums.map((album) => {
    return (
      <TableItem
        key={album.Collection_URI}
        album={album}
      ></TableItem>
    );
  });

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full overflow-y-scroll no-scrollbar">
      {({ open }) => (
        <>
          <Banner></Banner>

          {/* Main Page */}
          <div className="relative flex h-auto items-start justify-between font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <LeftSide></LeftSide>

            {/* Main Content */}
            <section class="main-content" className="flex flex-col w-3/4 mt-5">
              {/* List Nav Bar */}
              <ListNavigation toggle = {handleToggle}></ListNavigation>
              {/* List Items */}
              { (albums.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <h1 className="text-4xl font-bold">No Albums in Collection</h1>
                  <h1 className="text-4xl font-bold">Add Some!</h1>
                  </div>
                  ) : (
                    <></>
                  )}
                {listView ? (
                  <div className="list-items">
                    {listItems}
                  </div>
                ) : (
                  <div className="table-items" class="grid grid-cols-2 items-center justify-items-center">
                    {tableItems}
                  </div>
                )}
            </section>
          </div>
        </>
      )}  
    </Disclosure>
  );
}

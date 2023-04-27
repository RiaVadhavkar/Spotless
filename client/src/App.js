import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Register from "./views/Register";
import Login from "./views/Login";
import List from "./views/List";
import Favorites from "./views/Favorites";
import Stats from "./views/Stats";
import Social from "./views/Social";
import Admin from "./views/Admin";
import Settings from "./views/Settings";
import axios from "axios";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const SessionContext = createContext();

function App() {
  const [sessionToken, setSessionToken] = useState("");
  const [sessionUsername, setSessionUsername] = useState("");
  const [admin, setAdmin] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [filterAlbums, setFilteredAlbums] = useState([]);
  const [albumsLength, setAlbumsLength] = useState(0);
  const [userData, setUserData] = useState({});
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    const admin = sessionStorage.getItem("admin");

    if (token && username) {
      setSessionToken(token);
      setSessionUsername(username);
    }
    if (admin) {
      setAdmin(admin);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("token", sessionToken);
    sessionStorage.setItem("username", sessionUsername);
    sessionStorage.setItem("admin", admin);
  }, [sessionToken, sessionUsername, admin]);

  async function getAlbums() {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    await axios
      .get(api + "user/collection", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then(function (response) {
        setAlbums(response.data.collection_items);
        setAlbumsLength(response.data.collection_items.length);
        setFilteredAlbums(response.data.collection_items);
        console.log(albums);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  const sorts = ["Name", "Rating", "Year", "Type"];
  const [selectedSort, setSelectedSort] = useState(sorts[0]);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const handleSort = (sort) => {
    console.log(sort);
    setSelectedSort(sort);
    setFilteredAlbums(searchFilterSort(collectionName, selectedFilter, sort));
    console.log("Sorted albums");
    console.log(albums, filterAlbums);
  };

  const handleFilter = (index) => {
    console.log(index);
    setSelectedFilter(index);
    setFilteredAlbums(searchFilterSort(collectionName, index, selectedSort));
    console.log("Filtered albums");
    console.log(albums, filterAlbums);
  };

  const searchFilterSort = (search, filter, sort) => {
    console.log(filter);
    let filteredAlbums = albums;
    if (filter === 1) {
      filteredAlbums = albums.filter((album) => {
        return album.Status === "Planning";
      });
    } else if (filter === 2) {
      filteredAlbums = albums.filter((album) => {
        return album.Status === "Complete";
      });
    } else if (filter === 3) {
      filteredAlbums = albums.filter((album) => {
        return album.Status === "Dropped";
      });
    }
    // setFilteredAlbums(sortAlbums(selectedSort, filteredAlbums));
    // console.log("Filtered albums");
    // console.log(albums);

    let sortedAlbums = [];
    if (sort === "Name") {
      sortedAlbums = filteredAlbums.sort((a, b) => {
        return a.Collection.localeCompare(b.Collection);
      });
    } else if (sort === "Rating") {
      sortedAlbums = filteredAlbums.sort((a, b) => {
        return b.Rating - a.Rating;
      });
    } else if (sort === "Year") {
      sortedAlbums = filteredAlbums.sort((a, b) => {
        let bYear = parseInt(b.Release_date.split(" ")[3]);
        let aYear = parseInt(a.Release_date.split(" ")[3]);
        return bYear - aYear;
      });
    } else if (sort === "Type") {
      sortedAlbums = filteredAlbums.sort((a, b) => {
        return a.Type.localeCompare(b.Type);
      });
    }
    return sortedAlbums;
  };

  const handleSearch = (search) => {
    setCollectionName(search.target.value);
    // albums.filter((album) => {
    //   return album.Collection.toLowerCase().includes(search.target.value);
    // });
    const toBeSearchList = searchFilterSort(
      search.target.value,
      selectedFilter,
      selectedSort
    );
    const searchList = toBeSearchList.filter((album) => {
      return album.Collection.toLowerCase().includes(search.target.value);
    });
    console.log("search list", searchList);
    setFilteredAlbums(searchList);
  };

  return (
    // TODO: add class="font-default" to App
    <div className="App" class="h-screen">
      <SessionContext.Provider
        value={{
          sessionToken,
          setSessionToken,
          sessionUsername,
          setSessionUsername,
          albums,
          setAlbums,
          albumsLength,
          getAlbums,
          admin,
          setAdmin,
          userData,
          setUserData,
          getUserStats,
          handleSort,
          sorts,
          selectedSort,
          handleFilter,
          selectedFilter,
          filterAlbums,
          setFilteredAlbums,
          collectionName,
          setCollectionName,
          handleSearch,
        }}
      >
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<List />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/social" element={<Social />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>

        <Footer></Footer>
      </SessionContext.Provider>
    </div>
  );
}

export default App;

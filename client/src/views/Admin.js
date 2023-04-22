import { Disclosure } from "@headlessui/react";
import Banner from "../components/Banner";
import LeftSide from "../components/LeftSide";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import AdminTextStats from "../components/AdminTextStats";
import AdminCollectionByYear from "../components/AdminCollectionByYear";
import axios from "axios";

export default function Admin() {
  const navigate = useNavigate();
  const { sessionUsername, sessionToken } = useContext(SessionContext);
  const [adminData, setAdminData] = useState({});
  const [collectionsByYear, setCollectionsByYear] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    const admin = sessionStorage.getItem("admin");
    console.log(admin);
    if (admin === false) {
      navigate("/list");
    }   
  }, []);

  useEffect(() => {
    if (sessionUsername && sessionToken) {
      getAdminStats();
    }
  }, [sessionUsername, sessionToken]);

  useEffect(() => {
    console.log("adminData")
    console.log(adminData);
    console.log("collectionsByYear")
    console.log(collectionsByYear);
    if (adminData && collectionsByYear) {
      setLoaded(true);
    }
  }, [adminData]);
    

  async function getAdminStats() {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    await axios
    .get(api + "admin/stats", { 
      withCredentials: true, 
      headers: { Authorization: `Bearer ${sessionToken}` }
     })
      .then(function (response) {
      console.log(response.data);
      setAdminData(response.data);
      setCollectionsByYear(response.data.collections_by_year);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    // console.log(formValues);

    const form = new FormData();
    form.append("username", formValues.username);
    form.append("password", formValues.password);

    // console.log(Array.from(form));

    axios
      .post(api + "register", form, {headers: { Authorization: `Bearer ${sessionToken}` }})
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const adminText = <AdminTextStats stats={adminData}></AdminTextStats>;

  const adminCollectionByYear = <AdminCollectionByYear stats={collectionsByYear}></AdminCollectionByYear>;

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
                {adminText}
                {adminCollectionByYear}
              </div>
              ) : (
                <div
                  className="flex justify-center items-center h-96"
                  style={{ backgroundColor: "#F5F5F5" }}
                >Loading</div>
              )}
            </section>
          </div>
          <div
          >
          <form
        class="flex flex-col gap-5 justify-center w-4/5"
        onSubmit={handleSubmit}
      >
        <div class="flex justify-center items-center">
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            id="username"
            placeholder="Username"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-50 h-12"
          />
        </div>
        <div class="flex justify-center items-center">
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            id="password"
            placeholder="Password"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-50 h-12"
          />
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="text-white bg-spotless-green w-4/6 py-2.5 rounded-full text-3xl"
          >
            Register New Admin
          </button>
        </div>
      </form>
          </div>
        </>
      )}
    </Disclosure>
  );
}

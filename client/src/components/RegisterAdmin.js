import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPersonPlusFill } from "react-icons/bs";

export default function RegisterAdmin() {
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
    console.log("adminData");
    console.log(adminData);
    console.log("collectionsByYear");
    console.log(collectionsByYear);
    if (adminData && collectionsByYear) {
      setLoaded(true);
    }
  }, [adminData]);

  async function getAdminStats() {
    const api = "https://api:5001/";
    await axios
      .get(api + "admin/stats", {
        withCredentials: false,
        headers: { Authorization: `Bearer ${sessionToken}` },
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
    const api = "https://api:5001/";

    event.preventDefault();

    // console.log(formValues);

    const form = new FormData();
    form.append("username", formValues.username);
    form.append("password", formValues.password);

    // console.log(Array.from(form));

    axios
      .post(api + "register", form, {
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <div class="flex w-full justify-center items-center my-4 px-4">
        <form
          class="flex flex-col gap-5 justify-center w-1/2"
          onSubmit={handleSubmit}
        >
          <h1 class="flex text-2xl justify-center items-center">
            <u>Create New Admin</u>
          </h1>
          <div class="flex justify-center items-center">
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              id="username"
              placeholder="Username"
              class="bg-transparent text-white w-full rounded-2xl p-5 placeholder-spotless-green placeholder-opacity-50 h-12 ring-2 ring-spotless-dark-green"
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
              class="bg-transparent text-white w-full rounded-2xl p-5 placeholder-spotless-green placeholder-opacity-50 h-12 ring-2 ring-spotless-dark-green"
            />
          </div>
          <div class="flex justify-center items-center">
            <button
              type="submit"
              class="flex justify-center items-center text-white bg-spotless-green py-2.5 w-1/2 rounded-full text-lg ring-2 ring-white hover:bg-spotless-green"
            >
              <BsPersonPlusFill className="h-5 w-5" aria-hidden="true" />
              &nbsp;Register New Admin
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

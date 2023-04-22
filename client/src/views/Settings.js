import { Disclosure } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../components/ChangePassword";
import ChangeProfilePic from "../components/ChangeProfilePic";

export default function Settings() {
  const navigate = useNavigate();
  const { sessionToken, sessionUsername, setSessionToken, setSessionUsername, setAdmin } =
    useContext(SessionContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!token || !username) {
      console.log("Not logged in");
      navigate("/login");
    }
  }, []);

  const [error, setError] = useState(false);
  const [wrongPasswordError, setWrongPasswordError] = useState(false);

  const [formValues, setFormValues] = useState({
    olddPassword: "",
    password: "",
    confirmedPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePasswordChange = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    event.preventDefault();
    if (formValues.password !== formValues.confirmedPassword) {
      setError(true);
      return;
    }
    const form = new FormData();
    form.append("old_password", formValues.oldPassword);
    form.append("new_password", formValues.password);
    await axios
      .post(api + "update/password", form, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then(function (response) {
        console.log(response.data);
        setSessionToken("");
        setSessionUsername("");
        setAdmin(false);
        setError(false);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        setWrongPasswordError(true);
      });
  };

  const handleDelete = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    await axios
      .get(api + "user/delete", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}` },
      })
      .then(function (response) {
        console.log(response.data);
        setSessionToken("");
        setSessionUsername("");
        setAdmin(false);
        navigate("/register");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <div className="relative flex h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div
              className="home-page-box"
              class="flex flex-col justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded"
            >
              <h1 class="text-4xl font-bold mb-4">
                <u>Settings</u>
              </h1>
              <div class="flex flex-row justify-center items-center w-full">
                <ChangePassword></ChangePassword>
                <ChangeProfilePic></ChangeProfilePic>
              </div>
              <button
                type="submit"
                class="text-white bg-red-600 px-6 py-2.5 rounded-full text-3xl my-2"
                onClick={handleDelete}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

import { Disclosure } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CgPassword } from "react-icons/cg";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { sessionToken, sessionUsername, setSessionToken, setSessionUsername } =
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
        navigate("/register");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="flex flex-col items-center justify-center w-full">
      <form
        class="flex flex-col items-center justify-center w-1/2 h-auto"
        onSubmit={handlePasswordChange}
      >
        <label class="text-2xl m-2">Change Password</label>
        <input
          class=" m-2 bg-transparent text-white w-full rounded-2xl p-5 placeholder-spotless-green placeholder-opacity-50 h-12 ring-2 ring-spotless-dark-green"
          type="password"
          name="oldPassword"
          value={formValues.oldPassword}
          onChange={handleInputChange}
          id="oldPassword"
          placeholder="Previous Password"
        />
        <input
          class="m-2 bg-transparent text-white w-full rounded-2xl p-5 placeholder-spotless-green placeholder-opacity-50 h-12 ring-2 ring-spotless-dark-green"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          id="password"
          placeholder="New Password"
        />
        <input
          class="m-2 bg-transparent text-white w-full rounded-2xl p-5 placeholder-spotless-green placeholder-opacity-50 h-12 ring-2 ring-spotless-dark-green"
          type="password"
          name="confirmedPassword"
          value={formValues.confirmedPassword}
          onChange={handleInputChange}
          id="confirmedPassword"
          placeholder="Confirm New Password"
        />
        {error && (
          <p class="text-red-600 text-xl mb-2">Passwords Do Not Match</p>
        )}
        {wrongPasswordError && (
          <p class="text-red-600 text-xl mb-2">Wrong Password</p>
        )}
        <button
          type="submit"
          class="flex items-center justify-center m-2 text-white bg-spotless-dark-green px-6 py-2.5 rounded-full text-lg"
        >
          <CgPassword className="h-5 w-5" aria-hidden="true" />
          &nbsp;Change Password
        </button>
      </form>
    </div>
  );
}

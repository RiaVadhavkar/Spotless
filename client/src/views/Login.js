import React, { useState, useContext, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../App";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const { setSessionToken, setSessionUsername, setAdmin, admin } =
    useContext(SessionContext);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (token && username) {
      navigate("/list");
    }
  }, []);

  const [loginError, setLoginError] = useState(false);

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
  const handleSubmit = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    const form = new FormData();
    form.append("username", formValues.username);
    form.append("password", formValues.password);

    await axios
      .post(api + "login", form, {
        withCredentials: false,
      })
      .then(function (response) {
        console.log(response);

        const token = response.data.token;
        const name = response.data.name;
        const admin = response.data.admin;

        setSessionToken(token);
        setSessionUsername(name);
        setAdmin(admin);

        console.log(admin);

        navigate("/list");
      })
      .catch(function (error) {
        console.log("Login failed");
        console.log(error);
        setLoginError(true);
      });
  };

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full overflow-y-scroll no-scrollbar">
      {({ open }) => (
        <>
          <div className="relative flex flex-col h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div
              className="home=page-box"
              class="grid grid-cols-2 justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded mb-14 divide-x-4 divide-solid divide-white"
            >
              <div class="flex flex-col justify-evenly items-center text-6xl font-semibold h-1/3">
                Welcome to
                <div className="app-name">
                  <span class="text-spotless-green ">Spot</span>
                  <span class="text-white">less!</span>
                </div>
              </div>
              <div class="flex justify-center items-center font-semibold h-4/5">
                <form
                  class="flex flex-col gap-5 justify-center w-4/5"
                  onSubmit={handleSubmit}
                >
                  <h1 class="flex text-4xl justify-center items-center p-8">
                    <u>LOGIN</u>
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
                  {loginError && (
                    <div class="flex justify-center items-center text-red-600">
                      <RiErrorWarningFill
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                      &nbsp;Invalid Username or Password
                    </div>
                  )}
                  <div class="flex justify-center items-center">
                    <button
                      type="submit"
                      class="text-white bg-spotless-green w-1/2 py-2.5 rounded-full text-3xl"
                    >
                      Login
                    </button>
                  </div>
                  <div class="flex justify-center items-center">Don't have an account?</div>
                  <div class="flex justify-center items-center">
                    <button
                      type="submit"
                      class="text-white ring ring-white w-1/3 py-2 rounded-full text-2xl"
                    >
                      <Link to="/register">Sign Up</Link>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Login;

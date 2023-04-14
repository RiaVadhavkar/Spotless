import React, { useState, useContext } from "react";
import { Disclosure } from "@headlessui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../App";

const Login = () => {
  const navigate = useNavigate();

  const { setSessionToken, setSessionUsername } = useContext(SessionContext);

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

    const loginResponse = await axios.post(api + "login", form, {
      withCredentials: true,
    });

    if (loginResponse.status === 200) {
      console.log(loginResponse);

      const token = loginResponse.data.token;
      const name = loginResponse.data.name;

      setSessionToken(token);
      setSessionUsername(name);

      axios
        .get(api + "profile", {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(function (response) {
          console.log(response.data);
          navigate("/list");
        })
        .catch(function (error) {
          console.log(error);
        });

      // navigate('/list');
    } else {
      console.log("Login failed");
      console.log(loginResponse);
    }
  };

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
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
                      Login
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

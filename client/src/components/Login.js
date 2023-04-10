import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Login() {
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
  const handleSubmit = (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    // console.log(formValues);

    const form = new FormData();
    form.append("username", formValues.username);
    form.append("password", formValues.password);

    // console.log(Array.from(form));

    axios
      .post(api + "register", form)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
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
            Sign Up
          </button>
        </div>
        <div class="flex justify-center items-center">OR</div>
        <div class="flex justify-center items-center">
          <Link to="/login">
            <button
              type="submit"
              class="text-white  py-2 rounded-full text-2xl ring ring-white"
            >
              Login
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

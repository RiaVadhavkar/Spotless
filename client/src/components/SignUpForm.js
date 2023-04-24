import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
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
        navigate("/login");
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
        <h1 class="flex text-4xl justify-center items-center p-8">
          <u>SIGN UP</u>
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
            class="text-white bg-spotless-green w-1/2 py-2.5 rounded-full text-3xl"
          >
            Sign Up
          </button>
        </div>
        <div class="flex justify-center items-center">OR</div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="text-white ring ring-white w-1/3 py-2 rounded-full text-2xl"
          >
            <Link to="/login">Login</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useRef } from "react";
import axios from "axios";

export default function Login() {
  const username = useRef("");
  const password = useRef("");

  function registerUser(regUsername, regPassword) {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    // var regFormData = new FormData();
    // regFormData.append("username", regUsername);
    // regFormData.append("password", regPassword)

    axios
      .post(api + "register", {
        username: regUsername,
        password: regPassword,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }  

  return (
    <div class="flex justify-center items-center font-semibold h-4/5">
      <form class="flex flex-col gap-5 justify-center w-4/5" onSubmit={registerUser(username.current.value, password.current.value)}>
        <div class="flex justify-center items-center">
          <input
            type="text"
            ref={username}
            id="username"
            placeholder="Username"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-50 h-12"
          />
        </div>
        <div class="flex justify-center items-center">
          <input
            type="password"
            ref={password}
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
          <button
            type="submit"
            class="text-white ring ring-white w-1/3 py-2 rounded-full text-2xl"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

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

    // console.log(formValues);

    const form = new FormData();
    form.append("username", formValues.username);
    form.append("password", formValues.password);

    // console.log(Array.from(form));

    const loginResponse = await axios.post(api + "login", form, { withCredentials: true });

    // TODO Reroute to List.js view with user information

    if (loginResponse.status === 200) {
      console.log(loginResponse);

      const sessionCookie = loginResponse.headers["set-cookie"];
      console.log(sessionCookie);
      axios.get(api + 'profile', { headers: { Cookie: sessionCookie }, withCredentials: true})
      .then(function (response) {
        console.log(response.data);
        navigate('/list');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else {
      console.log("Login failed")
      console.log(loginResponse);
    }
      
    // axios.post(api + "login", form)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div class="flex justify-center items-center font-semibold h-4/5">
      <form
        onSubmit={handleSubmit}
      >
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
            id="username"
            placeholder="Username"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-100  h-12"
          />
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
            id="password"
            placeholder="Password"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-100 h-12"
          />
            <button
              type="submit"
            >
              Login
            </button>
      </form>
    </div>
  )
}

export default Login
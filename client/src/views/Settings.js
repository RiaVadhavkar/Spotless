import { Disclosure } from "@headlessui/react";
import { useContext, useState } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { sessionToken, setSessionToken, setSessionUsername } = useContext(SessionContext);  

  const [error, setError] = useState(false);

  const [formValues, setFormValues] = useState({
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
    form.append("password", formValues.password);
    await axios.post(api + "user/change-password", form, {
       withCredentials: true, 
       headers: { Authorization : `Bearer ${sessionToken}` 
      }})
      . then(function (response) {
        console.log(response.data);
        setSessionToken("");
        setSessionUsername("");
        setError(false);
        navigate('/login');
      })
      .catch(function (error) {
        console.log(error);
      });
    };
    

  const handleDelete = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    await axios.get(api + 'user/delete', { withCredentials:true , headers: { Authorization : `Bearer ${sessionToken}` }})
      .then(function (response) {
      console.log(response.data);
      setSessionToken("");
      setSessionUsername("");
      navigate('/register');
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Disclosure as="body" className="bg-spotless-green text-white h-full">
      {({ open }) => (
        <>
          <div className="relative flex flex-col h-full items-center justify-center font-semibold mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div
              className="home=page-box"
              class="flex justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded mb-14"
            >
              <div class="flex flex-col items-center justify-center w-full">
                <h1 class="text-5xl font-bold mb-4">Settings</h1>
                <form
                  class="flex flex-col items-center justify-center w-full"
                  onSubmit={handlePasswordChange}
                >
                  <label class="text-3xl mb-2">Change Password</label>
                  <input
                    class="text-2xl mb-2 text-spotless-dark-green rounded placeholder-neutral-900 placeholder-opacity-60 h-12"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    id="password"
                    placeholder="New Password"
                  />
                  <input
                    class="text-2xl mb-2 text-spotless-dark-green rounded placeholder-neutral-900 placeholder-opacity-60 h-12"
                    type="password"
                    name="confirmedPassword"
                    value={formValues.confirmedPassword}
                    onChange={handleInputChange}
                    id="confirmedPassword"
                    placeholder="Confirm New Password"
                  />
                  {error && (
                    <p class="text-red-600 text-3xl mb-2">
                      Passwords do not match
                    </p>
                  )}
                  <button
                    type="submit"
                    class="text-white bg-red-600 px-6 py-2.5 rounded-full text-3xl"
                  >
                    Change Password
                  </button>
                </form>
              </div>
              <button
                type="submit"
                class="text-white bg-red-600 px-6 py-2.5 rounded-full text-3xl"
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

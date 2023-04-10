import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import RegistrationBox from "../components/RegistrationBox";
import { useContext } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { sessionToken, setSessionToken, sessionUsername, setSessionUsername } = useContext(SessionContext);  
  console.log(sessionToken);

  const handleDelete = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    // console.log(sessionUsername);
    // console.log(sessionToken);

    axios.get(api + 'user/delete', { withCredentials:true , headers: { Authorization : `Bearer ${sessionToken}` }})
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

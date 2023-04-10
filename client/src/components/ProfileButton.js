import { BsPersonFill } from "react-icons/bs";
import { SessionContext } from "../App";
import { useContext } from "react";
import axios from "axios";

export default function ProfileButton(props) {
  const { sessionToken, setSessionToken, setSessionUsername } = useContext(SessionContext);

  const logoutText = "LOGOUT";
  const loginText = "SIGN UP / LOGIN";
  const profileButtonText = (props.build) ? logoutText : loginText;

  const handleLogout = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    event.preventDefault();

    if (props.build) { }
  }


  return (
    <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
      {/* <Link to="/"> */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
      >
        { (props.build) ? <BsPersonFill className="text-xl font-semibold" /> : null}
        &nbsp;
        <span className="text-xl font-semibold">{profileButtonText}</span>
      </button>
      {/* </Link> */}
    </div>
  );
}

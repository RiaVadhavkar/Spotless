import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../App'
import axios from 'axios';

export default function ProfileButtonLogout() {
    const navigate = useNavigate();
    const { sessionToken, setSessionToken, setSessionUsername } = useContext(SessionContext);  

    const handleLogout = async (event) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    event.preventDefault();

    axios.get(api + 'logout', { withCredentials:true , headers: { Authorization : `Bearer ${sessionToken}` }})
      .then(function (response) {
      console.log(response.data);
      setSessionToken("");
      setSessionUsername("");
      navigate('/login');
    }).catch(function (error) {
      console.log(error);
    });
  }

    return (
      <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
        <button
          type="button"
          onClick={handleLogout}
          className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          &nbsp;
          <span className="text-xl font-semibold">Logout</span>
        </button>
      </div>
    );
  }
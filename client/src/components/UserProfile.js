import user_profile from "../assets/users/ashley.jpeg";
import { SessionContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const api = "https://spotless-test-api.discovery.cs.vt.edu/";
  const {
    sessionUsername,
    sessionToken,
    getUserStats,
    userData,
    profilePicture,
  } = useContext(SessionContext);
  const [minutesLoaded, setMinutesLoaded] = useState(false);
  const usern = sessionStorage.getItem("username");
  const [imageURL, setImageURL] = useState(api + "/user/image/" + usern);

  useEffect(() => {
    if (sessionUsername && sessionToken) {
      getUserStats();
    }
    axios
      .get(imageURL)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("using default image");
        setImageURL(user_profile);
      });
  }, [sessionUsername, sessionToken]);

  useEffect(() => {
    if (userData && userData.minutes_collection_complete) {
      setMinutesLoaded(true);
    }
  }, [userData]);

  return (
    <section
      class="user-profile"
      className="bg-neutral-900 rounded-2xl h-max w-64 -translate-y-16 flex flex-col items-center justify-center"
    >
      <img
        class="h-44 w-44 mt-5 rounded-full lg:block"
        src={imageURL}
        alt="Spotless User"
      />
      <h1 class="username" className="mt-6 text-3xl font-bold">
        {sessionUsername}
      </h1>
      {/* <h2 class="social-stats" className="mt-2.5 text-sm font-bold">
        6 followers&nbsp;|&nbsp;18 following
      </h2> */}
      <section
        class="minutes-listened"
        className="flex flex-col my-6 text-sm items-center justify-center"
      >
        Total Minutes Listened
        <h1 class="minutes" className="text-2xl text-spotless-green">
          {minutesLoaded ? (
            userData.minutes_collection_complete["Total Minutes Listened"] ? (
              Math.floor(
                userData.minutes_collection_complete["Total Minutes Listened"]
              )
            ) : (
              0
            )
          ) : (
            <span>Loading</span>
          )}
        </h1>
      </section>
      {/* <section
        class="genre-overview"
        className="flex flex-col text-sm mb-6 mt-2.5 w-full justify-center items-center"
      >
        Top Genre Overview
        <div
          class="genre-pill-graph"
          className="flex flex-row text-black text-xs w-11/12 mt-2.5"
        >
          <div class="w-1/2 bg-white rounded-l-full p-0.5">
            &nbsp;&nbsp;&nbsp;pop
          </div>
          <div class="w-1/4 bg-spotless-dark-green p-0.5">&nbsp;hip-hop</div>
          <div class="w-1/4 bg-spotless-green rounded-r-full p-0.5">
            &nbsp;rock
          </div>
        </div>
      </section> */}
    </section>
  );
}

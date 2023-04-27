import { Disclosure } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropzone from "./Dropzone";

export default function ChangeProfilePic() {
  const {sessionToken, setSessionToken} = useContext(SessionContext);

  const handlePhoto = async (event) => {
    event.preventDefault();
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    const form = new FormData();
    var imageFile = document.querySelector("#file");
    form.append("profile_photo", imageFile.files[0]);
    await axios
      .post(api + "update/image", form, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${sessionToken}`, "Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="flex items-center justify-center w-full">
      {/* <form class="flex flex-col items-center justify-center w-full"> */}
        {/* <label class="text-2xl mb-2">Change Profile Picture</label> */}
        <div class="relative flex text-center border-2 border-dashed border-white rounded w-[12em] min-h-[12em] justify-center items-center">
          {/* <input
            id="file"
            type="file"
            name="file"
            required=""
            class="text-center opacity-0 cursor-pointer absolute z-10 w-full"
            // style={{ display: "none" }}
            accept="image/png, image/jpeg, image/jpg, image/gif"
            onChange={handlePhoto}
            capture
          ></input>
          <label for="imageUpload" class="cursor-pointer block">
              Add Profile Picture Here
          </label> */}
          <Dropzone />
        </div>
      {/* </form> */}
    </div>
  );
}

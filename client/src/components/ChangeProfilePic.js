import { Disclosure } from "@headlessui/react";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import user_profile from "../assets/users/ashley.jpeg"; //TODO: remove

export default function ChangeProfilePic() {
  const api = "https://spotless-test-api.discovery.cs.vt.edu/";
  const { sessionUsername, sessionToken, setSessionToken } =
    useContext(SessionContext);
  const usern = sessionStorage.getItem("username");
  const [imageURL, setImageURL] = useState(api + "/user/image/" + usern);

  useEffect(() => {
    if (sessionUsername && sessionToken) {
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
    }
  }, [sessionUsername, sessionToken]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    console.log(acceptedFiles);
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";
    const form = new FormData();
    var imageFile = acceptedFiles;
    form.append("image", imageFile[0]);
    console.log(sessionToken);
    await axios
      .post(api + "update/image", form, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
  });

  // const handlePhoto = async (event) => {
  //   // event.preventDefault();
  //   const api = "https://spotless-test-api.discovery.cs.vt.edu/";
  //   const form = new FormData();
  //   var imageFile = document.querySelector("#file");
  //   form.append("image", imageFile.files[0]);
  //   console.log(sessionToken);
  //   await axios
  //     .post(api + "update/image", form, {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${sessionToken}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <div class="flex flex-col items-center justify-center w-full">
      <h1 class="text-2xl mb-4">Change Profile Picture</h1>
      <div class="flex flex-row items-center justify-center w-full gap-4">
        <div
          class="relative flex text-center border-2 border-dashed border-white rounded w-[12em] min-h-[12em] justify-center items-center"
          {...getRootProps()}
        >
          <input
            id="file"
            type="file"
            name="file"
            required=""
            class="text-center opacity-0 cursor-pointer absolute z-10 w-full"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            {...getInputProps()}
            capture
          ></input>
          <label for="imageUpload" class="cursor-pointer block">
            Add or Drag Profile Picture Here
            <br />
            [Square Image]
          </label>
        </div>
        <div class="flex text-center w-[12em] min-h-[12em] justify-center items-center">
          <img
            className="w-fit max-h-fit rounded lg:block"
            src={imageURL}
            alt="Spotless User"
          />
        </div>
      </div>
    </div>
  );
}

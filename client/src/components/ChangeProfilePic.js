import { Disclosure } from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChangeProfilePic() {
  return (
    <div class="flex flex-col items-center justify-center w-full">
      <form class="flex flex-col items-center justify-center w-full">
      <label class="text-2xl mb-2">Change Profile Picture</label>
        <input
          id="imageUpload"
          type="file"
          name="profile_photo"
          placeholder="Photo"
          required=""
          capture
        ></input>
      </form>
    </div>
  );
}

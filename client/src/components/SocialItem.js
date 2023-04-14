import josh from "../assets/users/josh.jpeg";
import { FaStar, FaStarHalfAlt, FaCommentAlt } from "react-icons/fa";
import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

export default function SocialItem() {
  return (
    <div
      className="table-item"
      class="flex flex-col bg-neutral-900 h-56 w-56 rounded-2xl m-3.5 items-center justify-center grow"
    >
      <img src={josh} alt="josh" class="w-36 rounded-full" />
      <div className="social-name" class="flex items-center justify-center mt-2.5">
        josh
      </div>
    </div>
  );
}

import {
  FaStar,
  FaStarHalfAlt,
  FaCommentAlt,
  FaRegStar,
} from "react-icons/fa";
import { useState } from "react";
import CollectionModal from "./CollectionModal";

export default function ListItem(props) {
  const year = props.album.Release_date.split(" ")[3];
  const type =
    props.album.Type.charAt(0).toUpperCase() + props.album.Type.slice(1);
  const rating = props.album.Rating;
  const numFullStars = Math.floor(props.album.Rating);
  const numHalfStars = Math.floor((props.album.Rating - numFullStars) * 2);
  const ifHalfStar = numHalfStars === 1 ? true : false;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div
        className="list-item"
        class="grid grid-cols-8 bg-neutral-900 min-h-80 rounded-2xl my-3.5 items-center"
        onClick={openModal}
      >
        <img
          src={props.album.Cover_image}
          alt="temptation"
          class="ml-6 my-2.5 w-12"
        />
        <div class="col-span-3 text-lg">{props.album.Collection}</div>
        <div className="item-rating" class="flex items-center justify-center">
          {Array.from({ length: numFullStars }, (_, i) => (
            <FaStar className="h-5 w-5" aria-hidden="true" />
          ))}
          {ifHalfStar ? (
            <FaStarHalfAlt className="h-5 w-5" aria-hidden="true" />
          ) : (
            <></>
          )}
          {Array.from({ length: numEmptyStars }, (_, i) => (
            <FaRegStar className="h-5 w-5" aria-hidden="true" />
          ))}
        </div>
        <div class="flex items-center justify-center">{year}</div>
        <div class="flex items-center justify-center">{type}</div>
        <div class="flex items-center justify-center">
          <FaCommentAlt className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <CollectionModal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        album={props.album}
      />
    </div>
  );
}

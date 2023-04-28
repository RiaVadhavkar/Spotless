import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import CollectionModal from "./CollectionModal";

export default function TableItem(props) {
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
        className="table-item"
        class="grid grid-cols-3 bg-neutral-900 h-64 w-96 rounded-2xl m-3.5 items-center"
        onClick={openModal}
      >
        <div
          className="left-col"
          class="flex flex-col justify-center items-center"
        >
          <img
            src={props.album.Cover_image}
            alt={props.album.Collection}
            class="w-24 mb-2.5"
          />
          <div
            className="item-rating-tag"
            class="flex items-center justify-center"
          >
            Rating
          </div>
          <div
            className="item-rating"
            class="flex flex-cols items-center justify-center"
          >
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
          <div class="flex items-center justify-center mt-2.5">{type}</div>
          <div class="flex items-center justify-center mt-1.5">{year}</div>
        </div>

        <div
          className="right-col"
          class="col-span-2 flex flex-col justify-start pr-2.5 py-3.5 h-full"
        >
          <div class="col-span-3 text-lg mb-2.5">{props.album.Collection}</div>
          <div class="text-sm mb-2.5">{props.album.Artists}</div>
          <div class="text-sm">Review:</div>
          <div class="text-sm flex-wrap break-words">{props.album.Review}</div>
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

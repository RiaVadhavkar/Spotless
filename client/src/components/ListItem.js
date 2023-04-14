import temptation from "../assets/albums/temptation.jpg";
import { FaStar, FaStarHalfAlt, FaCommentAlt } from "react-icons/fa";

export default function ListItem() {
  return (
    <div
      className="list-item"
      class="grid grid-cols-8 bg-neutral-900 min-h-80 rounded mt-3.5 items-center"
    >
      <img src={temptation} alt="temptation" class="ml-6 my-2.5 w-12" />
      <div class="col-span-3 text-lg">The Name Chapter: TEMPTATION</div>
      <div className="item-rating" class="flex items-center justify-center">
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStarHalfAlt className="h-5 w-5" aria-hidden="true" />
      </div>
      <div class="flex items-center justify-center">2023</div>
      <div class="flex items-center justify-center">EP</div>
      <div class="flex items-center justify-center"><FaCommentAlt className="h-5 w-5" aria-hidden="true" /></div>
    </div>
  );
}

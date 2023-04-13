import sour from "../assets/albums/sour.jpg";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function ListItem(props) {
  return (
    <div
      className="list-item"
      class="grid grid-col-6 bg-neutral-900 min-h-80 w-full rounded mt-3.5"
    >
      <img src={sour} alt="sour" class="ml-6 my-2.5 w-12" />
      <div>SOUR</div>
      <div>
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStar className="h-5 w-5" aria-hidden="true" />
        <FaStarHalfAlt className="h-5 w-5" aria-hidden="true" />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

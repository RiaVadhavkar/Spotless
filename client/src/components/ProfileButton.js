import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";

export default function ProfileButton(props) {
  return (
    <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
      {/* <Link to="/"> */}
      <button
        type="button"
        className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
      >
        <BsPersonFill className="h-6 w-6" aria-hidden="true" />
        &nbsp;
        <span className="text-xl font-semibold">{props.build}</span>
      </button>
      {/* </Link> */}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ProfileButton() {
  return (
    <div className="absolute inset-y-0 right-0 flex w-auto items-center sm:static sm:inset-auto">
      <Link to="/login">
        <button
          type="button"
          className="flex justify-between items-center w-auto rounded-full bg-spotless-green px-4 py-2 text-white text-xl font-semibold hover:text-white hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-900"
        >
          SIGN UP&nbsp;/&nbsp;LOGIN
        </button>
      </Link>
    </div>
  );
}

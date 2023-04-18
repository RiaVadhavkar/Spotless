import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Brand() {
  return (
    <Link to="/">
      <section className="flex auto items-center justify-center sm:items-stretch sm:justify-start">
        <img className="h-12 w-auto lg:block" src={logo} alt="Spotless" />
        &nbsp;
        <span class="text-spotless-green text-5xl font-semibold">Spot</span>
        <span class="text-white text-5xl font-semibold">less</span>
      </section>
    </Link>
  );
}

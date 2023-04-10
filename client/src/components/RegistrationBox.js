import SignUpForm from "./SignUpForm";

export default function RegistrationBox() {
  return (
    <div
      className="home=page-box"
      class="grid grid-cols-2 justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded mb-14 divide-x-4 divide-solid divide-white"
    >
      <div class="flex flex-col justify-evenly items-center text-6xl font-semibold h-1/3">
        Welcome to
        <div className="app-name">
          <span class="text-spotless-green ">Spot</span>
          <span class="text-white">less!</span>
        </div>
      </div>
      <SignUpForm></SignUpForm>
    </div>
  );
}

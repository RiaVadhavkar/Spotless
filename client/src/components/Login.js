export default function Login() {
  return (
    <div class="flex justify-center items-center font-semibold h-4/5">
      <form class="flex flex-col gap-5 justify-center w-4/5">
        <div class="flex justify-center items-center">
          <input
            type="text"
            id="username"
            placeholder="Username"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-50 h-12"
          />
        </div>
        <div class="flex justify-center items-center">
          <input
            type="password"
            id="password"
            placeholder="Password"
            class="bg-white text-spotless-dark-green w-full rounded placeholder-neutral-900 placeholder-opacity-50 h-12"
          />
        </div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="text-white bg-spotless-green w-4/6 py-2.5 rounded-full text-3xl"
          >
            Sign Up
          </button>
        </div>
        <div class="flex justify-center items-center">OR</div>
        <div class="flex justify-center items-center">
          <button
            type="submit"
            class="text-white ring ring-white w-1/3 py-2 rounded-full text-2xl"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default function AdminTextStats() {
  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Users
          <h1 class="minutes" className="text-2xl text-spotless-green">
            5
          </h1>
        </div>
        <div class="text-sm text-center">
          Collections
          <h1 class="minutes" className="text-2xl text-spotless-green">
            8
          </h1>
        </div>
        <div class="text-sm text-center">
          Number of Tracks
          <h1 class="minutes" className="text-2xl text-spotless-green">
            112
          </h1>
        </div>
        <div class="text-sm text-center">
          Total Track Minutes
          <h1 class="minutes" className="text-2xl text-spotless-green">
            21566854
          </h1>
        </div>
      </section>
    </section>
  );
}

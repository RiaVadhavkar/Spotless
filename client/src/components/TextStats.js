export default function TextStats() {
  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Minutes Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            8534
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            2133
          </h1>
        </div>
        <div class="text-sm text-center">
          Minutes Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            128936
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            3854
          </h1>
        </div>
      </section>
    </section>
  );
}

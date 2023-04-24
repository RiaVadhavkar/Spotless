export default function TextStats(props) {
  // const m = Math.floor(props.stats.Track_length / 1000 / 60); // minutes

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Minutes Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            77
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            26
          </h1>
        </div>
        <div class="text-sm text-center">
          Minutes Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            734
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            41
          </h1>
        </div>
      </section>
    </section>
  );
}

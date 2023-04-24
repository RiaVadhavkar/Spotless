import { useEffect } from "react";

export default function AdminTextStats(props) {
  const m = Math.floor(props.stats.Track_length / 1000 / 60); // minutes

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Users
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.users.Count}
          </h1>
        </div>
        <div class="text-sm text-center">
          Collections
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.collections.Count}
          </h1>
        </div>
        <div class="text-sm text-center">
          Number of Tracks
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.Num_tracks}
          </h1>
        </div>
        <div class="text-sm text-center">
          Total Track Minutes
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {m}
          </h1>
        </div>
      </section>
    </section>
  );
}

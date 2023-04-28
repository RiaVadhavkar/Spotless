import { useEffect } from "react";

export default function AdminTextStats(props) {
  const m = Math.floor(props.stats.tracks.Track_length / 1000 / 60); // minutes

  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Total Users
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.users.Count ? props.stats.users.Count : 0}
          </h1>
        </div>
        <div class="text-sm text-center">
          Total Collections
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.collections.Count ? props.stats.collections.Count : 0}
          </h1>
        </div>
        <div class="text-sm text-center">
          Total Number of Tracks
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.tracks.Num_tracks ? props.stats.tracks.Num_tracks : 0}
          </h1>
        </div>
        <div class="text-sm text-center">
          Total Track Minutes
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {m ? m : 0}
          </h1>
        </div>
      </section>
    </section>
  );
}

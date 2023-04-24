export default function TextStats(props) {
  return (
    <section class="flex items-center justify-center bg-neutral-900 rounded-2xl my-2">
      <section class="grid grid-cols-4 w-full justify-items-center my-6">
        <div class="text-sm text-center">
          Minutes Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {Math.floor(
              props.stats.minutes_collection_planned["Total Minutes Listened"] ? props.stats.minutes_collection_planned["Total Minutes Listened"] : 0
            )}
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Planned
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.minutes_collection_planned["Number Tracks"] ? props.stats.minutes_collection_planned["Number Tracks"] : 0}
          </h1>
        </div>
        <div class="text-sm text-center">
          Minutes Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {Math.floor(
              props.stats.minutes_collection_complete["Total Minutes Listened"] ? props.stats.minutes_collection_complete["Total Minutes Listened"] : 0
            )}
          </h1>
        </div>
        <div class="text-sm text-center">
          Songs Listened
          <h1 class="minutes" className="text-2xl text-spotless-green">
            {props.stats.minutes_collection_complete["Number Tracks"] ? props.stats.minutes_collection_complete["Number Tracks"] : 0}
          </h1>
        </div>
      </section>
    </section>
  );
}

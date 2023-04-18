export default function TrackItem(props) {
  return (
    <div
      className="track-item"
      class="grid grid-cols-5 items-center text-lg my-2"
    >
      <div class="col-span-1">#N</div>
      <div class="col-span-3 col-start-2">Name of Track</div>
      <div class="col-span-1 col-start-5">M:SS</div>
    </div>
  );
}

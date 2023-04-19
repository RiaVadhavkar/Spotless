export default function TrackItem(props) {
  let h, m, s;
  h = Math.floor(props.track.Track_length/1000/60/60);
  m = Math.floor((props.track.Track_length/1000/60/60 - h)*60);
  s = Math.floor(((props.track.Track_length/1000/60/60 - h)*60 - m)*60);
  s < 10 ? s = `0${s}`: s = `${s}`
  return (
    <div
      className="track-item"
      class="grid grid-cols-5 items-center text-lg my-2"
    >
      <div class="col-span-1">{props.track.Track_no}</div>
      <div class="col-span-3 col-start-2">{props.track.Track_name}</div>
      <div class="col-span-1 col-start-5">{m}:{s}</div>
    </div>
  );
}

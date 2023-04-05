import sos from "../assets/albums/sos.jpg";
import sour from "../assets/albums/sour.jpg";
import harryshouse from "../assets/albums/harrys-house.jpg";
import positions from "../assets/albums/positions.jpg";
import temptation from "../assets/albums/temptation.jpg";

export default function HomeImageCarousel() {
  return (
    <div
      className="home-album-images"
      class="flex flex-row justify-start items-center w-full h-auto overflow-x-scroll no-scrollbar gap-6 mx-6"
    >
      <img src={sos} alt="sos" class="rounded" />
      <img src={sour} alt="sour" class="rounded" />
      <img src={harryshouse} alt="harryshouse" class="rounded" />
      <img src={positions} alt="positions" class="rounded" />
      <img src={temptation} alt="temptation" class="rounded" />
    </div>
  );
}

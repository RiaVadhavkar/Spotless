import HomeImageCarousel from "./HomeImageCarousel";

export default function HomeBox() {
  return (
    <div
      className="home=page-box"
      class="flex justify-center items-center bg-neutral-900 h-3/4 min-h-[31.25rem] w-11/12 rounded mb-14"
    >
      <HomeImageCarousel></HomeImageCarousel>
    </div>
  );
}

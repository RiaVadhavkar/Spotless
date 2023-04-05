import UserProfile from "./UserProfile";
import AddCollection from "./AddCollection";

export default function LeftSide() {
  return (
    <section className="flex flex-col">
      <UserProfile></UserProfile>
      <AddCollection></AddCollection>
    </section>
  );
}

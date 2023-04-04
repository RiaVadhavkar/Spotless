import UserProfile from "./UserProfile";
import AddCollection from "./AddCollection";
import AddCollectionModal from "./AddCollectionModal";

export default function LeftSide() {
  return (
    <section className="flex flex-col">
      <UserProfile></UserProfile>
      <AddCollection></AddCollection>
      <AddCollectionModal></AddCollectionModal>
    </section>
  );
}

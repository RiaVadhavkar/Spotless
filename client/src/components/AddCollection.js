import { useState } from "react";
import AddCollectionModal from "./AddCollectionModal";

export default function AddCollection() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div>
      <button
        class="add-collection-button"
        className="bg-spotless-dark-green font-bold ring ring-white -translate-y-8 p-2.5 rounded-full h-auto w-64 flex flex-col items-center justify-center"
        onClick={openModal}
      >
        Add Collection
      </button>

      <AddCollectionModal build={isOpen}></AddCollectionModal>
    </div>
  );
}

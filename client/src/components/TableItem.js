import { FaStar, FaStarHalfAlt, FaRegStar, FaCommentAlt } from "react-icons/fa";
import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";

export default function TableItem(props) {
  const year = props.album.Release_date.split(" ")[3];
  const type = props.album.Type.charAt(0).toUpperCase() + props.album.Type.slice(1);
  const numFullStars = Math.floor(props.album.Rating);
  const numHalfStars = Math.floor((props.album.Rating - numFullStars) * 2);
  const ifHalfStar = numHalfStars === 1 ? true : false;
  const numEmptyStars = 5 - numFullStars - numHalfStars;

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div
        className="table-item"
        class="grid grid-cols-3 bg-neutral-900 h-56 w-96 rounded m-3.5 items-center"
        onClick={openModal}
      >
        <div
          className="left-col"
          class="flex flex-col justify-center items-center"
        >
          <img src={props.album.Cover_image} alt="temptation" class="w-24 mb-2.5" />
          <div
            className="item-rating-tag"
            class="flex items-center justify-center"
          >
            Rating
          </div>
          <div
            className="item-rating"
            class="flex flex-cols items-center justify-center"
          >
            {Array.from(
        { length: numFullStars },
        (_, i) => <FaStar className="h-5 w-5" aria-hidden="true" />
      )}
      {ifHalfStar ? (
        <FaStarHalfAlt className="h-5 w-5" aria-hidden="true" />
      ) : (
        <></>
      )}
      {Array.from(
        { length: numEmptyStars },
        (_, i) => <FaRegStar className="h-5 w-5" aria-hidden="true" />
      )}
          </div>
          <div class="flex items-center justify-center mt-2.5">EP</div>
        </div>

        <div
          className="right-col"
          class="col-span-2 flex flex-col justify-start pr-2.5 py-3.5 h-full"
        >
          <div class="col-span-3 text-lg mb-2.5">
            {props.album.Collection}
          </div>
          <div class="text-sm mb-2.5">{ props.album.Artists }</div>
          <div class="text-sm">Review:</div>
          <div class="text-sm">
            <p>Review goes here ! </p>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-neutral-900 p-6 text-left shadow-xl transition-all w-1/2">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center font-bold leading-6 text-spotless-green p-2.5"
                  >
                    Add Collection to List
                  </Dialog.Title>
                  {/* <div className="p-2.5">
                    <form
                      onSubmit={addURLtoList(spotifyURL.current.value)}
                      class="flex justify-between items-center"
                    >
                      <span class="text-white">Album URL</span>
                      <input
                        id="link"
                        ref={spotifyURL}
                        type="text"
                        class="text-spotless-green rounded p-1 flex grow mx-2"
                      />
                      <select
                        id="status"
                        onChange={(e) => setStatus(e.target.value)}
                        defaultValue={status}
                        class="text-spotless-green rounded font-bold p-1"
                      >
                        {statuses.map((status) => (
                          <option value={status}>{status}</option>
                        ))}
                      </select>
                    </form>
                  </div> */}

                  <div className="flex pt-4 items-center justify-end gap-3">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-white bg-opacity-25 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-spotless-dark-green px-4 py-2 text-sm font-medium text-white hover:bg-spotless-green focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Add
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

import { Fragment, useState, useRef, useContext } from "react";
import { SessionContext } from "../App";
import { Transition, Dialog } from "@headlessui/react";

import axios from "axios";

export default function AddCollection() {
  const { sessionToken, getAlbums } = useContext(SessionContext);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const statuses = ["Planning", "Complete", "Dropped"];
  const [status, setStatus] = useState(statuses[0]);

  const spotifyURL = useRef("");

  const addURLtoList = (URL, e) => {
    const api = "https://spotless-test-api.discovery.cs.vt.edu/";

    console.log(sessionToken);
    console.log(URL);

    e.preventDefault();

    axios
      .post(
        api + "add/album/" + status,
        {
          collection_url: URL,
        },
        {
          headers: { Authorization: `Bearer ${sessionToken}` },
          withCredentials: true,
        }
      )
      .then(function (response) {
        console.log(response);
        getAlbums();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        class="add-collection-button"
        className="bg-spotless-dark-green font-bold ring ring-white -translate-y-8 p-2.5 rounded-full h-auto w-64 flex flex-col items-center justify-center"
        onClick={openModal}
      >
        ADD COLLECTION
      </button>

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
                  <div className="p-2.5">
                    <form
                      onSubmit={(e) =>
                        addURLtoList(spotifyURL.current.value, e)
                      }
                    >
                      <div class="flex justify-between items-center">
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
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex pt-4 items-center justify-end gap-3">
                        <button
                          type="submit"
                          onClick={closeModal}
                          class="inline-flex justify-center rounded-md border border-transparent bg-spotless-dark-green px-4 py-2 text-sm font-medium text-white hover:bg-spotless-green focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          class="inline-flex justify-center rounded-md border border-transparent bg-white bg-opacity-25 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
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

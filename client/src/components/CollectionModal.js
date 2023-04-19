import React from 'react'
import { Fragment, useState } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import {
    FaSpotify,
    FaRegHeart,
    FaTrashAlt,
    FaPlusCircle,
    FaMinusCircle, } from 'react-icons/fa';
import TrackItem from "../components/TrackItem";

export default function CollectionModal(props) {
    const year = props.album.Release_date.split(" ")[3];
    const type = props.album.Type.charAt(0).toUpperCase() + props.album.Type.slice(1);
    const rating = props.album.Rating;
    const albumLink = "https://open.spotify.com/album/" + props.album.Collection_URI;
    
    const albumTracks = props.album.tracks.map((track, index) => {
        return (
            <TrackItem track={track} index={index} />
        );
    });

    // const handleDelete = () => {
    //     const api = "

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-neutral-900 text-white p-6 text-left shadow-xl transition-all w-4/5">
                  <div
                    className="details-modale"
                    class="grid grid-cols-5 items-center"
                    onClick={props.openModal}
                  >
                    {/* Left Side */}
                    <div
                      className="left-col"
                      class="flex flex-col row-span-2 justify-center items-center"
                    >
                      <img
                        src={props.album.Cover_image}
                        alt={props.album.Collection}
                        class="w-40 mb-2.5"
                      />
                      <div
                        className="play=on-spotify"
                        class="flex flex-row items-center justify-center"
                      >
                        <a href={albumLink} target='_blank'>
                            <FaSpotify className="h-5 w-5" aria-hidden="true" />
                            &nbsp;Play on Spotify
                        </a>
                      </div>
                      <div
                        className="item-rating-tag"
                        class="flex items-center justify-center mt-2.5"
                      >
                        <button
                          type="button"
                          class="inline-flex justify-center items-center rounded-md border border-transparent bg-spotless-dark-green p-1.5 font-medium text-white  hover:bg-spotless-green focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                          {/* TODO: add on-click functionality, FaRegHeart becomes FaHeart and stores in Favorites Tab */}
                          <FaRegHeart className="h-5 w-5" aria-hidden="true" />
                          &nbsp;Favorite
                        </button>
                      </div>
                      <div
                        className="item-rating-tag"
                        class="flex items-center justify-center mt-2.5"
                      >
                        Rating
                      </div>
                      <div
                        className="item-rating"
                        class="flex flex-cols items-center justify-evenly w-3/4"
                      >
                        <button>
                          <FaMinusCircle
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                        <div>{rating}</div>
                        <button>
                          <FaPlusCircle
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div class="flex items-center justify-center mt-2.5">
                        Type:&nbsp;{type}
                      </div>
                      <div class="flex items-center justify-center mt-2.5">
                        Year:&nbsp;{year}
                      </div>
                      <div class="flex items-center justify-center mt-2.5">
                        Number:&nbsp;SONG COUNT
                      </div>
                      <div class="flex items-center justify-center mt-2.5">
                        Time:&nbsp;TOTAL TIME
                      </div>
                      <div
                        className="item-rating-tag"
                        class="flex items-center justify-center mt-2.5"
                      >
                        <button
                          type="button"
                          onClick={handleDelete}
                          class="inline-flex justify-center items-center rounded-md border border-transparent bg-white bg-opacity-25 p-1.5 font-medium text-white hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                          {/* TODO: add on-click functionality, FaRegHeart becomes FaHeart and stores in Favorites Tab */}
                          <FaTrashAlt className="h-5 w-5" aria-hidden="true" />
                          &nbsp;Delete Collection
                        </button>
                      </div>
                    </div>

                    {/* Upper Right */}
                    <div
                      className="right-col-upper"
                      class="col-span-4 col-start-2 flex flex-col justify-start pr-2.5 py-3.5 h-full"
                    >
                      <div class="text-xl mb-2.5">{props.album.Collection}</div>
                      <div class="mb-2.5">{props.album.Artists}</div>
                      <div class="relative w-full min-w-[200px]">
                        <textarea
                          class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-spotless-green border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-spotless-green placeholder-shown:border-t-spotless-green focus:border-2 focus:border-spotless-green focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                          placeholder=" "
                        ></textarea>
                        <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-spotless-green transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-spotless-green before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-spotless-green after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-spotless-green peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-spotless-green peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-spotless-green peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-spotless-green peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                          Review
                        </label>
                      </div>
                    </div>

                    {/* List of Tracks in Collection */}
                    <div
                      className="right-col-lower"
                      class="col-span-4 col-start-2 justify-start pr-2.5 py-3.5 h-full text-center"
                    >
                        {albumTracks}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}

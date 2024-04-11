import { VscTools } from "react-icons/vsc";
import { MdOutlinePets } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { TbRulerMeasure } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { BiBath } from "react-icons/bi";
import { GiFoodTruck } from "react-icons/gi";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import { CiBookmark } from "react-icons/ci";
import MapInfo from "./MapInfo";
import { AuthContext } from "../context/authContext";
import DeletePost from "./DeletePost";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../axios";
import toast from "react-hot-toast";

export default function ItemInfo({ listing }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(listing?.isSaved);

  const { currentUser } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (data) => {
      setSaved((prev) => !prev);
      return apiRequest.post("/bookmark", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(`post has been ${saved ? "saved" : "removed"}!`);
    },
    onError: () => {
      setSaved((prev) => !prev);
      toast.error("Something went wrong");
    },
  });
  const createChat = useMutation({
    mutationFn: (data) => {
      return apiRequest.post("/chat", data);
    },
    onSuccess: () => {
      navigate("/profile");
    },
    onError: (error) => {
      if (error.response.status === 405) {
        navigate("/profile");
      } else {
        toast.error("An error occurred");
      }
    },
  });
  function handleSave() {
    if (!currentUser) {
      return navigate("/login");
    }
    mutation.mutate({ postId: listing.id });
  }

  function HandleChat() {
    if (!currentUser) {
      return navigate("/login");
    }
    createChat.mutate({ receiverId: listing.userId });
  }

  return (
    <div className="flex flex-col px-3">
      <div className="flex flex-col gap-y-4">
        <h2 className="text-lg font-semibold md:text-xl">General</h2>
        <div className="bg-base-200 rounded-md p-4 gap-y-4 flex flex-col">
          <div className="flex items-center gap-x-1">
            <VscTools className="text-2xl text-yellow-300" />
            <div className="flex flex-col gap-y-0">
              <span className="text-base font-semibold md:text-lg capitalize">
                Utilities
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-medium">
                {listing.postDetail[0].utilities}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <MdOutlinePets className="text-2xl text-yellow-300" />
            <div className="flex flex-col gap-y-0">
              <span className="text-base font-semibold md:text-lg capitalize">
                Pet Policy
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-medium">
                {listing.postDetail[0].pet}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <CiMoneyCheck1 className="text-2xl text-yellow-300" />
            <div className="flex flex-col gap-y-0">
              <span className="text-base font-semibold md:text-lg capitalize">
                Income Policy
              </span>
              <span className="text-xs md:text-sm text-gray-400 font-medium">
                {listing.postDetail[0].income}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 mt-5">
        <h2 className="text-lg font-semibold md:text-xl">Room Sizes</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 bg-base-200 p-2 rounded-md">
            <TbRulerMeasure className="text-yellow-400" />
            <span> {listing.postDetail[0].size} sqm</span>
          </div>
          <div className="flex items-center gap-x-2 bg-base-200 p-2 rounded-md">
            <IoBedOutline className="text-yellow-400" />
            <span>{listing.bedroom} Bedroom</span>
          </div>
          <div className="flex items-center gap-x-2 bg-base-200 p-2 rounded-md">
            <BiBath className="text-yellow-400" />
            <span>{listing.bathroom} Bathroom</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <h2 className="text-lg font-semibold md:text-xl">Nearby Places</h2>
        <div className="bg-base-200 p-3 rounded-md flex justify-between w-full">
          <div className="flex items-center gap-x-1">
            <IoSchoolOutline className="text-yellow-400 text-xl md:text-2xl" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold ">School</span>
              <span className="text-xs text-gray-400 ">
                {" "}
                {listing.postDetail[0].school}m away
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <MdOutlineDirectionsBus className="text-yellow-400 text-xl md:text-2xl" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold ">Bus Stop</span>
              <span className="text-xs text-gray-400 ">
                {listing.postDetail[0].bus}m away
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-1">
            <GiFoodTruck className="text-yellow-400 text-xl md:text-2xl" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold ">Restaurant</span>
              <span className="text-xs text-gray-400 ">
                {listing.postDetail[0].restaurant}m away
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 mt-4">
        <h2 className="text-lg font-semibold md:text-xl">Location</h2>
        <div className="w-full h-[12.5rem] z-[10]">
          {listing && <MapInfo listing={listing} />}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pb-6">
        {currentUser?.id !== listing.userId && (
          <button
            disabled={createChat.isPending}
            className="btn btn-sm md:btn rounded-md"
            onClick={HandleChat}
          >
            <TbMessageDots /> Send a Message
          </button>
        )}
        <button
          className={`btn btn-sm md:btn rounded-md transition-all duration-300 ${
            saved ? "md:bg-gray-500 bg-gray-500" : ""
          }`}
          onClick={handleSave}
        >
          <CiBookmark /> {saved ? "Bookmarked" : "Save the Place"}
        </button>
      </div>
      {currentUser?.id && currentUser?.id === listing.user.id && (
        <div className=" flex flex-col gap-y-5">
          <h2 className="text-lg font-semibold md:text-xl">Delete Post</h2>
          <button
            className="btn bg-red-500 rounded-md hover:bg-red-600"
            onClick={() => document.getElementById("deletePost").showModal()}
          >
            Delete Post
          </button>

          {currentUser?.id === listing.user.id && (
            <DeletePost listing={listing} />
          )}
        </div>
      )}
    </div>
  );
}

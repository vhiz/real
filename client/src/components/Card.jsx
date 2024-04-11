import { LazyLoadImage } from "react-lazy-load-image-component";
import { CiBookmark, CiChat1, CiLocationOn } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import toast from "react-hot-toast";

export default function Card({ house }) {
  const [saved, setSaved] = useState(house.isSaved);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    setSaved(house?.isSaved);
  }, [setSaved, house]);
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
  function handleSave() {
    if (!currentUser) {
      return navigate("/login");
    }
    mutation.mutate({ postId: house.id });
  }
  return (
    <div className="w-full h-80 flex group mt-5 pb-9 flex-col lg:flex-row lg:h-[12.5rem]">
      <div className="relative h-full flex-[1.7] lg:flex-1 rounded-md overflow-hidden ">
        <LazyLoadImage
          src={house.images[0]}
          alt=""
          className="group-hover:scale-[1.1] duration-300 transition-all ease-in-out h-full w-full object-cover"
        />
        <div className="absolute top-2 left-2 p-2 bg-gray-700 text-xs capitalize rounded-md">
          {house.type}
        </div>
      </div>
      <div className="flex-[2] lg:pl-5 flex h-full flex-col justify-between">
        <Link
          to={`/list/${house.id}`}
          className="text-xl font-semibold capitalize link link-hover transition-all duration-300 hover:text-blue-500"
        >
          {house.title}
        </Link>
        <div className="flex items-center gap-x-1">
          <CiLocationOn />
          <span className="text-sm text-gray-500 capitalize">
            {house.address} {house.city}
          </span>
        </div>
        <span className="text-xl bg-yellow-300/45 rounded-md w-max p-1">
          ${house.price}
        </span>
        <div className="flex items-center justify-between">
          <div className="flex gap-x-4">
            <div
              data-theme="cupcake"
              className="flex items-center gap-x-1 bg-gray-300 rounded-md p-1 text-xs font-semibold"
            >
              <IoBedOutline /> {house.bedroom} Bedroom
            </div>
            <div
              data-theme="cupcake"
              className="flex items-center gap-x-1 bg-gray-300 rounded-md p-1 text-xs font-semibold"
            >
              <PiBathtubLight /> {house.bathroom} Bathroom
            </div>
          </div>
          <div className="flex gap-x-4">
            <button
              className={`btn btn-xs btn-outline rounded-md ${
                saved ? "bg-gray-500" : ""
              }`}
              onClick={handleSave}
            >
              <CiBookmark />
            </button>
            <button className="btn btn-xs btn-outline rounded-md">
              <CiChat1 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

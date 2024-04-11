import { LazyLoadImage } from "react-lazy-load-image-component";

import ProfileUpdate from "../components/ProfileUpdate";
import AddPost from "../components/AddPost";
import CardList from "../components/CardList";
import MessageContainer from "../components/Messages/MessageContainer";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DeleteUser from "../components/DeleteUser";
import { useState } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [type, setType] = useState("list");
  const data = useLoaderData();

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-[3] w-full lg:pr-12 flex flex-col gap-y-6">
        <div className="w-full">
          <div className="flex w-full justify-between">
            <h1 className="font-medium text-xl">User Information</h1>
            <button
              className="btn bg-yellow-300/70 rounded-md"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Update
            </button>
            <ProfileUpdate />
          </div>
          <div className="flex flex-col gap-y-3 justify-center">
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold">Avatar :</h3>
              <LazyLoadImage
                src={currentUser.img || "https://rb.gy/dc9jfv"}
                alt=""
                className="object-cover w-12 h-12 rounded-full"
                fill
              />
            </div>
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold">Username :</h3>
              <span className="font-normal capitalize">
                {currentUser.username}
              </span>
            </div>
            <div className="flex items-center gap-x-2">
              <h3 className="font-semibold">Email :</h3>
              <span className="font-normal">{currentUser.email}</span>
            </div>
            <button
              className="btn w-20  bg-red-700 rounded-md hover:bg-red-900"
              onClick={() => document.getElementById("deleteUser").showModal()}
            >
              Delete
            </button>
            <DeleteUser />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-between">
            <div className="flex">
              <button
                className={`font-medium text-lg btn rounded-none rounded-l-md ${
                  type === "list" ? "bg-green-600" : ""
                }`}
                onClick={() => setType("list")}
              >
                My List
              </button>
              <button
                className={`font-medium text-lg btn rounded-none rounded-r-md ${
                  type === "saved" ? "bg-green-600" : ""
                }`}
                onClick={() => setType("saved")}
              >
                Saved Post
              </button>
            </div>
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="btn bg-yellow-300/70 rounded-md"
            >
              Add New Post
            </button>
            <AddPost />
          </div>
          {currentUser && type === "list" ? (
            <Suspense fallback={<Loading />}>
              <Await resolve={data.postResponse} errorElement={<Error />}>
                {(postResponse) => (
                  <CardList listings={postResponse.data.userPost} />
                )}
              </Await>
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <Await resolve={data.postResponse} errorElement={<Error />}>
                {(postResponse) => (
                  <CardList listings={postResponse.data.bookmarked} />
                )}
              </Await>
            </Suspense>
          )}
        </div>
      </div>
      <div className="flex-[2] h-full">
        <Suspense fallback={<Loading />}>
          <Await resolve={data.chatResponse} errorElement={<Error />}>
            {(chatResponse) => <MessageContainer chats={chatResponse.data} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

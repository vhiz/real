import { LazyLoadImage } from "react-lazy-load-image-component";
import Messages from "./Messages.jsx";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../axios.js";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import notificationStore from "../../notificationStore.js";
import { MessageContext } from "../../context/MessageContext.jsx";

export default function MessageItem({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { chats, setChats } = useContext(MessageContext);
  const { onlineUsers } = useContext(SocketContext);
  const [selected, setSelected] = useState(false);
  const online = onlineUsers?.includes(message.receiver.id) ? true : false;
  const { fetch } = notificationStore();

  const mutation = useMutation({
    mutationFn: (id) => {
      return apiRequest.get(`/chat/${id}`);
    },
    onSuccess: (result) => {
      if (result.data?.seenBy.includes(currentUser?.id)) {
        fetch();
      }
      setChats(result.data);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  function handleClick(id) {
    setSelected((prev) => !prev);
    setChats({});
    if (!selected) {
      mutation.mutate(id);
    }
  }
  return (
    <div className="collapse overflow-visible collapse-arrow rounded-md bg-base-200">
      <input type="checkbox" onClick={() => handleClick(message.id)} />
      <div className="collapse-title text-xl font-medium">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <div className={`avatar ${online ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <LazyLoadImage
                  effect="blur"
                  src={message.receiver.img}
                  alt=""
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="font-semibold">{message.receiver.username}</h3>
          </div>
          <div className="flex items-center gap-x-4">
            <span>{message.lastMessage}</span>

            {message.seenBy.includes(currentUser.id) ||
            chats?.id === message.id ? (
              ""
            ) : (
              <div className="badge rounded-full bg-green-600 text-white">
                new
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="collapse-content">
        {mutation.isPending ? (
          <Loading />
        ) : (
          <Messages chats={chats} setChats={setChats} />
        )}
      </div>
    </div>
  );
}

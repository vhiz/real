import { useContext, useEffect } from "react";
import MessageInput from "./MessageInput.jsx";
import MessageList from "./MessageList";
import { SocketContext } from "../../context/SocketContext.jsx";
import toast from "react-hot-toast";
import { apiRequest } from "../../axios.js";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext.jsx";

export default function Messages({ chats, setChats }) {
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: () => {
      return apiRequest.put(`/chat/read/${chats.id}`);
    },
    onSuccess: () => {},
    onError: () => {
      toast.error("failed to read message");
    },
  });

  useEffect(() => {
    if (chats && socket) {
      socket.on("getMessage", (data) => {
        if (chats.id === data.chatId) {
          const play = new Audio("/noti2.mp3");
          play.play();
          setChats((prev) => ({
            ...prev,
            messages: [...prev.messages, { ...data, newMessage: true }],
          }));
          mutation.mutate();
        } else if (data.receiver.id === currentUser.id) {
          const play = new Audio("/noti.mp3");
          play.play();
          toast(
            <div className="flex gap-x-5 items-center w-[30vw]">
              <img
                src={data.receiver.img}
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex flex-col items-center justify-start w-full">
                <h2 className="2xl font-bold">{data.receiver.username}</h2>
                <p>{data.text}</p>
              </div>
            </div>,
            {
              position: "top-right",
              duration: 10000,
            }
          );
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [chats, currentUser, mutation, setChats, socket]);
  return (
    <div className="w-full h-[22rem] flex flex-col justify-between ">
      <MessageList messages={chats.messages} />
      <MessageInput chats={chats} setChats={setChats} />
    </div>
  );
}

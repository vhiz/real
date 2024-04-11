import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast";
import { SocketContext } from "./SocketContext";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../axios";
export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const [chats, setChats] = useState({});
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
    const handleMessage = (data) => {
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
    };

    if (socket) {
      socket.on("getMessage", handleMessage);
    }

    return () => {
      if (socket) {
        socket.off("getMessage", handleMessage);
      }
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <MessageContext.Provider value={{ chats, setChats }}>
      {children}
    </MessageContext.Provider>
  );
};

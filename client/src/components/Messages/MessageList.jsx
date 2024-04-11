import { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import { AuthContext } from "../../context/authContext.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";

export default function MessageList({ messages }) {
  const { currentUser } = useContext(AuthContext);
  const lastMessage = useRef();
  const { socket } = useContext(SocketContext);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    socket?.on("getTyping", (data) => {
      if (data.receiverId === currentUser.id) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
        }, 3000);
      }
    });
  }, [currentUser, socket, typing]);

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
  return (
    <div className="w-full h-[calc(100%-20%)] p-2 overflow-y-scroll lg:scrollbar-thin scrollbar-hide">
      {messages?.map((message) => (
        <div key={message.id} ref={lastMessage}>
          <Message
            message={message}
            own={currentUser?.id === message?.senderId}
          />
        </div>
      ))}

      <div
        className={`chat chat-start duration-300 ${
          typing ? "animate-pulse animate-infinite" : "animate-fadeOut duration-100 w-0 p-0"
        }`}
      >
        <div className={`chat-bubble text-white bg-slate-800 animate-twPulse animate-infinite`}>......</div>
      </div>
    </div>
  );
}

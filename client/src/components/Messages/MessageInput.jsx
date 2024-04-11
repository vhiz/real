import { useContext, useEffect, useState } from "react";
import { apiRequest } from "../../axios";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SocketContext } from "../../context/SocketContext";
import debounce from "lodash/debounce";
import { AuthContext } from "../../context/authContext";
export default function MessageInput({ chats, setChats }) {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useContext(SocketContext);
  const { currentUser } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: (text) => {
      return apiRequest.post(`/message/${chats.id}`, { text });
    },
    onSuccess: (result) => {
      setChats((prev) => ({
        ...prev,
        messages: [...prev.messages, { ...result.data, newMessage: true }],
      }));
      socket.emit("sendMessage", {
        receiver: chats?.receiver,
        data: result.data,
      });
      setText("");
    },
    onError: () => {
      toast.error("failed to send message");
    },
  });
  const handleIsTyping = debounce(function () {
    setIsTyping(false);
  }, 500);
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(text);
  };
  useEffect(() => {
    if (isTyping) {
      socket.emit("typing", {
        receiverId: chats?.receiver.id,
        chatId: chats?.id,
        senderId: currentUser.id,
      });
    }
  }, [chats, currentUser.id, isTyping, socket, text]);
  return (
    <form
      className="h-[14%] w-full flex border border-gray-300 rounded-md overflow-hidden"
      onSubmit={handleSubmit}
    >
      <input
        name="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setIsTyping(true);
          handleIsTyping();
        }}
        placeholder="Type a message..."
        className="input w-[80%] outline-none focus:outline-none border-none bg-transparent"
      />
      <button
        disabled={mutation.isPending}
        type="submit"
        className="btn rounded-none bg-transparent w-[20%] h-[12%] bg-yellow-300 border-none text-black"
      >
        Send
      </button>
    </form>
  );
}

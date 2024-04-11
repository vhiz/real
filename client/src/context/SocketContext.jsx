import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./authContext";
export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const newSocket = io("https://realestate-o1rr.onrender.com");
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket?.emit("addUsers", currentUser.id);
      socket?.on("onlineUsers", (data) => {
        setOnlineUsers(
          data.map((o) => o.userId).filter((o) => o !== currentUser?.id)
        );
      });
    }
  }, [currentUser, socket]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("realEstateUser")) || null
  );
  const [isMounted, setIsMounted] = useState(false);

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  useEffect(() => {
    if (isMounted) return;
    toast.loading(
      "The backend of this app uses a free service which shuts down when not in use please wait 40sec for the app to load ",
      {
        duration: 40000,
      }
    );
    
    setIsMounted(false);
  }, [isMounted]);

  useEffect(() => {
    localStorage.setItem("realEstateUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

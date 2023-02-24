import { useState, createContext } from "react";
import { io } from "socket.io-client";
import { apiURL } from "../config/config";

const socket = io(apiURL);

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <userContext.Provider value={{ user, setUser, socket }}>
      {children}
    </userContext.Provider>
  );
};
export { userContext, UserProvider };

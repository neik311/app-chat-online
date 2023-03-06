import { useState, createContext } from "react";
import { io } from "socket.io-client";
import { apiURL } from "../config/config";

const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const socket = io(apiURL);

  return (
    <userContext.Provider value={{ user, setUser, socket }}>
      {children}
    </userContext.Provider>
  );
};
export { userContext, UserProvider };

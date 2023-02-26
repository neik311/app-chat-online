import { useState, createContext } from "react";

const notifiContext = createContext();

const NotifiProvider = ({ children }) => {
  const [notifi, setNotifi] = useState([null]);
  const [loadData, setLoadData] = useState(1);

  return (
    <notifiContext.Provider
      value={{ notifi, setNotifi, loadData, setLoadData }}
    >
      {children}
    </notifiContext.Provider>
  );
};
export { notifiContext, NotifiProvider };

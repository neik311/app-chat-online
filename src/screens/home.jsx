// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { userContext } from "../context/userContext";
import Top from "../components/top";
import UserOnline from "../components/userOnline";
import Conversation from "../components/conversation";
import Menu from "../components/menu";
import { io } from "socket.io-client";
import { apiURL } from "../config/config";

const socket = io(apiURL);

export default function HomeScreen() {
  const { user, setUser } = useContext(userContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);
  console.log(onlineUsers);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      users = users.filter((u) => u.id !== user.id);
      setOnlineUsers(users);
    });
  }, []);
  return (
    <View>
      <Top />
      <UserOnline onlineUsers={onlineUsers} />
      <Conversation />
      <Menu />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

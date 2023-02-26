// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { userContext } from "../context/userContext";
import Top from "../components/top";
import UserOnline from "../components/userOnline";
import ListConversation from "../components/listConversation";
import Menu from "../components/menu";

export default function HomeScreen({ navigation }) {
  const { user, socket } = useContext(userContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      users = users.filter((u) => u.id !== user.id);
      setOnlineUsers(users);
    });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Top navigation={navigation} />
      <UserOnline onlineUsers={onlineUsers} />
      <ListConversation navigation={navigation} />
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

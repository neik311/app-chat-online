// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { userContext } from "../context/userContext";
import Top from "../components/top";
import UserOnline from "../components/userOnline";
import ListConversation from "../components/listConversation";
import Menu from "../components/menu";
import { getGroup } from "../api/apiGroup";

export default function HomeScreen({ navigation }) {
  const { user, socket } = useContext(userContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      fetchOnlineUser(users);
    });
  }, []);

  const fetchOnlineUser = async (users) => {
    const newUser = [];
    users.map(async (u) => {
      const found = await getGroup(user.id, u.id);
      if (found.data) {
        newUser.push(u);
        // console.log(newUser);
        setOnlineUsers(newUser);
      }
    });
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Top navigation={navigation} />
      <UserOnline onlineUsers={onlineUsers} />
      <ListConversation
        navigation={navigation}
        fetchOnlineUser={fetchOnlineUser}
      />
      <Menu navigation={navigation} />
    </View>
  );
}

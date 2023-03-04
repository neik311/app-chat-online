import { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { userContext } from "../context/userContext";
import { notifiContext } from "../context/notifiContext";
import { getGroupByUser } from "../api/apiGroup";
import Conversation from "./conversation";

export default function ListConversation({ navigation, fetchOnlineUser }) {
  const { user } = useContext(userContext);
  const { loadData } = useContext(notifiContext);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupByUser(user.id);
      if (res.statusCode === "200") {
        setConversations(res.data);
      }
    };
    fetchData();
  }, [loadData]);

  useEffect(() => {
    socket.on("getConversations", async (users) => {
      const res = await getGroupByUser(user?.id);
      if (res.statusCode === "200") {
        setConversations(res.data);
      }
      fetchOnlineUser(users);
    });
  }, []);

  // console.log(conversations);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%", height: "65%" }}
      >
        {conversations.map((c, index) => (
          <Conversation
            navigation={navigation}
            conversation={c}
            user={user}
            key={index}
          />
        ))}
      </ScrollView>
    </View>
  );
}

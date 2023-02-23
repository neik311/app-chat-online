import { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@react-native-material/core";
import { Stack, Avatar } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { userContext } from "../context/userContext";
import { getGroupByUser } from "../api/apiGroup";
import Conversation from "./conversation";

export default function ListConversation({ navigation }) {
  const { user } = useContext(userContext);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupByUser(user.id);
      if (res.statusCode === "200") {
        setConversations(res.data);
      }
    };
    fetchData();
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

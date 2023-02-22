import { ListItem } from "@react-native-material/core";
import { useState, useEffect, useContext } from "react";
import { Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getUserByUsername } from "../api/apiUser";

export default function Conversation({ navigation, conversation, user }) {
  const [oppositeUser, setOppositeUser] = useState({});
  const avatar = oppositeUser?.avatar;
  useEffect(() => {
    const friendId =
      conversation.sender === user.id
        ? conversation.receive
        : conversation.sender;

    const getUser = async () => {
      const res = await getUserByUsername(friendId);
      if (res.statusCode === "200") {
        setOppositeUser(res.data);
      }
      // console.log("res ",res.data)
    };
    getUser();
  }, [user, conversation]);

  return (
    <ListItem
      title={oppositeUser.id}
      leadingMode="avatar"
      leading={
        <Avatar
          image={{
            uri: oppositeUser.avatar,
          }}
        />
      }
      trailing={(props) => <Icon name="chevron-right" {...props} />}
      onPress={() => {
        navigation.navigate("Messenger", {
          oppositeUser,
          groupId: conversation.id,
        });
      }}
    />
  );
}

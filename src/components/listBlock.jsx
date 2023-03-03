import { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { userContext } from "../context/userContext";
import { ListItem, Avatar } from "@react-native-material/core";
import { getBlockUser, deleteBlockUser } from "../api/apiBlock";

export default function ListBlock() {
  const { user, setUser } = useContext(userContext);
  const [blockUser, setBlockUser] = useState([]);

  const fetchData = async () => {
    const res = await getBlockUser(user.id, "");
    if (res.statusCode === "200") {
      setBlockUser(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelBlock = async (blocked) => {
    const res = await deleteBlockUser(user.id, blocked);
    if (res.statusCode === "200") {
      fetchData();
    }
  };
  //   console.log(blockUser);
  return (
    <View style={{ flex: 1, backgroundColor: "#E6E6E6" }}>
      <ScrollView style={{ marginTop: 10 }}>
        {blockUser.map((u) => (
          <ListItem
            title={u.blocked}
            leadingMode="avatar"
            leading={
              <Avatar
                image={{
                  uri: u.avatar,
                }}
              />
            }
            trailing={(props) => (
              <MaterialCommunityIcons
                name="delete"
                style={{ color: "#DF0101" }}
                {...props}
                onPress={() => {
                  handleCancelBlock(u.blocked);
                }}
              />
            )}
            key={u.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}

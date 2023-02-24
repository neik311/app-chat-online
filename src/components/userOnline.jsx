import { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@react-native-material/core";
import { Stack, Avatar } from "@react-native-material/core";
import Line from "../components/line";

export default function UserOnline({ onlineUsers }) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginBottom: 10,
        // backgroundColor: "red",
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {onlineUsers.map((user, index) => (
          <Avatar
            image={{ uri: user.avatar }}
            style={{ marginLeft: 20 }}
            key={index}
          />
        ))}
        {/* <Avatar image={{ uri: "" }} style={{ marginLeft: 10 }} /> */}
      </ScrollView>
      {onlineUsers.length === 0 && (
        <Text
          variant="h8"
          style={{
            textAlign: "center",
            height: 40,
            marginTop: 15,
            marginBottom: 2,
            marginRight: 25,
          }}
        >
          Không có người bạn nào đang trực tuyến
        </Text>
      )}
    </View>
  );
}

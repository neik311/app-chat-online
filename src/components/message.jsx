import { useState, useEffect, useContext, useRef } from "react";
import { View, TouchableHighlight } from "react-native";
import { Text, TextInput, Avatar } from "@react-native-material/core";

export default function Message({ message, user, oppositeUser }) {
  let length = "60%";
  if (message.messages.length <= 18) {
    length = (3 * message.messages.length + 6).toString() + "%";
  }
  return (
    <>
      {user.id === message.sender ? (
        <TouchableHighlight
          style={{
            maxWidth: length,
            marginTop: 15,
            marginRight: 10,
            marginLeft: "auto",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              backgroundColor: "#417DC6",
              padding: 5,
              paddingLeft: 10,
              color: "white",
            }}
          >
            {message.messages}
          </Text>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          style={{
            maxWidth: length,
            marginTop: 15,
            marginLeft: 10,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <Text
            style={{
              backgroundColor: "#E6E6E6",
              padding: 5,
              paddingLeft: 10,
            }}
          >
            {message.messages}
          </Text>
        </TouchableHighlight>
      )}
    </>
  );
}

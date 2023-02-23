import { useState, useEffect, useContext, useRef } from "react";
import { View, TouchableHighlight } from "react-native";
import { Text, TextInput, Avatar } from "@react-native-material/core";
import moment from "moment";
import Line from "../components/line";

export default function Message({ message, user, prevMessage }) {
  let length = "60%";
  if (message.messages.length <= 18) {
    length = (3 * message.messages.length + 8).toString() + "%";
  }
  let lineTime = false;
  if (!prevMessage.current) {
    lineTime = true;
  } else if (
    message.createAt.toString().split("T")[0] !==
    prevMessage.current.createAt.toString().split("T")[0]
  ) {
    lineTime = true;
  }
  prevMessage.current = message;
  // console.log(message.createAt.toString().split("T")[0]);
  return (
    <>
      {lineTime === true ? <Line time={message.createAt} /> : <></>}
      {user.id === message.sender ? (
        <View
          style={{
            width: length,
            height: "auto",
            marginTop: 15,
            marginRight: 15,
            marginLeft: "auto",
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#417DC6",
          }}
        >
          <Text
            style={{
              paddingTop: 5,
              paddingRight: 10,
              paddingLeft: 10,
              color: "white",
            }}
          >
            {message.messages}
          </Text>
          <Text
            style={{
              marginTop: -5,
              color: "#0431B4",
              fontSize: 10,
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            {moment(message.createAt).format("hh:mm")}
          </Text>
        </View>
      ) : (
        <View
          style={{
            width: length,
            marginTop: 15,
            marginLeft: 10,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#E6E6E6",
          }}
        >
          <Text
            style={{
              paddingTop: 5,
              paddingRight: 10,
              paddingLeft: 10,
            }}
          >
            {message.messages}
          </Text>
          <Text
            style={{
              marginTop: -5,
              color: "#424242",
              fontSize: 10,
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            {moment(message.createAt).format("hh:mm")}
          </Text>
        </View>
      )}
    </>
  );
}

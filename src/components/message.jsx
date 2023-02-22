import { useState, useEffect, useContext, useRef } from "react";
import { Text, TextInput, Avatar } from "@react-native-material/core";

export default function Message({ message }) {
  //   console.log(message.messages);
  //   const scrollref = useRef();
  //   useEffect(() => {
  //     scrollref.current.scrollToEnd({ animated: true });
  //   }, [messages]);
  return <Text>{message.messages}</Text>;
}

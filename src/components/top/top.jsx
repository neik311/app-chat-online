// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { userContext } from "../../context/userContext";

export default function Top() {
  const { user, setUser } = useContext(userContext);
  console.log(user);
  return (
    <View
      style={{ width: "100%", height: "50%", backgroundColor: "red" }}
    ></View>
  );
}

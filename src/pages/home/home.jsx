// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { userContext } from "../../context/userContext";
import Top from "../../components/top/top";

export default function Home() {
  const { user, setUser } = useContext(userContext);
  console.log(user);
  return (
    <View>
      <Top />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

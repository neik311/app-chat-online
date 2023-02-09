// import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Login from "./src/pages/login/login";

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </NativeRouter>
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

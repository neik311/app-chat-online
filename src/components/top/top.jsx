// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "@react-native-material/core";
import { View } from "react-native";
import { userContext } from "../../context/userContext";
import { Searchbar } from "react-native-paper";

export default function Top() {
  const { user, setUser } = useContext(userContext);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ marginTop: "10%", height: "32%" }}>
      <Text
        variant="h6"
        style={{ marginLeft: 16, marginTop: 8, marginBottom: 8 }}
      >
        Hi ! nvk
      </Text>
      <Searchbar
        placeholder="Tìm kiếm"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "90%",
          height: "50%",
        }}
      />
    </View>
  );
  // console.log(user);
  // return (
  //   <View
  //     style={{
  //       width: "100%",
  //       height: "40%",
  //       backgroundColor: "#68A9F7",
  //       marginTop: "10%",
  //     }}
  //   >
  //     <View
  //       style={{
  //         width: "80%",
  //         marginLeft: "auto",
  //         marginRight: "auto",
  //         marginTop: 20,
  //       }}
  //     >
  //       <SearchBar
  //         placeholder="Type Here..."
  //         // onChangeText={this.updateSearch}
  //         // value={search}
  //         style={{ height: 50, fontSize: 10 }}
  //       />
  //     </View>
  //   </View>
  // );
}

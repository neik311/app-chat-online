// import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, Avatar, Text } from "@react-native-material/core";
import { TabView, SceneMap } from "react-native-tab-view";
import { Button } from "@react-native-material/core";
import { userContext } from "../context/userContext";
import Menu from "../components/menu";
import InfoUser from "../components/infoUser";
import ListBlock from "../components/listBlock";

const renderScene = SceneMap({
  first: InfoUser,
  second: ListBlock,
});

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useContext(userContext);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Đã chặn" },
  ]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    navigation.navigate("Login");
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <ImageBackground
        source={{
          uri: "https://cdn.le-vpn.com/wp-content/uploads/2020/03/Online-chat-rooms-1200x628-1.png",
        }}
        resizeMode="cover"
        style={{ height: "50%", backgroundColor: "#2E9AFE" }}
      >
        <Avatar
          style={styles.avatar}
          size={100}
          image={{ uri: user?.avatar }}
        />
        <Text
          variant="h6"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 5 }}
        >
          {user?.id}
        </Text>
      </ImageBackground>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ marginTop: -120 }}
      />
      <Button title="Đăng xuất" color="#DF0101" onPress={handleLogout} />
      <Menu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: "32%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

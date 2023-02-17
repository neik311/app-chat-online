// import { View, Text } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "@react-native-material/core";
import { login, loginByToken } from "../../api/apiUser";
import { userContext } from "../../context/userContext";

const Login = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        const res = await loginByToken(refreshToken);
        if (res.statusCode === "200") {
          await AsyncStorage.setItem("accessToken", res.data?.accessToken);
          setUser(res.data);
          navigation.navigate("Home");
        }
      }
    };
    fetchData();
  }, []);

  const handleLogin = async () => {
    const res = await login(id, password);
    console.log(res);
    if (res.statusCode === "200") {
      await AsyncStorage.setItem("accessToken", res.data.accessToken);
      await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
      setUser(res.data);
      navigation.navigate("Home");
    }
  };
  return (
    <View style={styles.login}>
      <TextInput
        variant="standard"
        label=""
        onChangeText={(text) => {
          setId(text);
        }}
        style={{ margin: 16 }}
      />
      <TextInput
        variant="standard"
        label=""
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
        style={{ margin: 16 }}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        style={{
          width: 120,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 10,
        }}
      />
      <Button
        title="Register"
        style={{ width: 120, marginLeft: "auto", marginRight: "auto" }}
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default Login;

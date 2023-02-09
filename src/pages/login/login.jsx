// import { View, Text } from "react-native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "@react-native-material/core";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log({ id, password });
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

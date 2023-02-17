import { View, Text } from "react-native";
import React from "react";
import { TextInput, Button } from "@react-native-material/core";

const Register = ({ navigation }) => {
  console.log("oke");
  return (
    <View>
      <Button
        title="Register"
        style={{
          width: 120,
          height: 50,
          marginTop: 60,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </View>
  );
};

export default Register;

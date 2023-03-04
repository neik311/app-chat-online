import React, { useContext, useState, useEffect } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../fonts/colors";
import Button from "../components/button";
import Input from "../components/input";
import Loader from "../components/loader";
import { notifiContext } from "../context/notifiContext";
import { forgotPassword } from "../api/apiUser";

const ForgotPasswordScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    cfPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setNotifi } = useContext(notifiContext);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email/username", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 6 || inputs.password.length > 15) {
      handleError("password from 6 to 15 characters", "password");
      isValid = false;
    }

    if (inputs.password !== inputs.cfPassword) {
      handleError("Confirm password is incorrect", "cfPassword");
      isValid = false;
    }
    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let res = await forgotPassword(inputs.email, inputs.password);
    console.log(res);
    if (res.statusCode === "200") {
      navigation.navigate("Login");
      setNotifi(["Xác thực email của bạn để thay đổi mật khẩu"]);
      setLoading(false);
      return;
    }
    setLoading(false);
    setNotifi([res.message, "error"]);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={{ paddingTop: 80, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 30, fontWeight: "bold" }}>
          Forgot Password
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "cfPassword")}
            onFocus={() => handleError(null, "cfPassword")}
            iconName="lock-outline"
            label="Confirm Password"
            placeholder="Enter your confirm password"
            error={errors.cfPassword}
            password
          />
          <Button title="Submit" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have account ? Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

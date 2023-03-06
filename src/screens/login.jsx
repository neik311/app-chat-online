import React, { useContext, useState, useEffect } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../fonts/colors";
import Button from "../components/button";
import Input from "../components/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/loader";
import { notifiContext } from "../context/notifiContext";
import { userContext } from "../context/userContext";
import { login, loginByToken } from "../api/apiUser";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setNotifi } = useContext(notifiContext);
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const checkLogin = async () => {
      const res = await loginByToken();
      if (res.statusCode === "200") {
        setUser(res.data);
        navigation.navigate("Home");
        setNotifi(["Đăng nhập thành công"]);
      }
    };
    checkLogin();
  }, []);

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
    }
    if (isValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    const res = await login(inputs.email, inputs.password);
    console.log(res);
    if (res.statusCode !== "200") {
      setLoading(false);
      setNotifi([res.message, "error"]);
      return;
    }
    await AsyncStorage.setItem("accessToken", res.data.accessToken);
    await AsyncStorage.setItem("refreshToken", res.data.refreshToken);
    setUser(res.data);
    setLoading(false);
    navigation.navigate("Home");
    setNotifi(["Đăng nhập thành công"]);
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
      <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Log In
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email or username"
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
          <Button title="Log In" onPress={validate} />
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{
              color: "#2E64FE",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Forgot password
          </Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Don't have account ?Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

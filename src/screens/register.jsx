import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import COLORS from "../fonts/colors";
import Button from "../components/button";
import Input from "../components/input";
import Loader from "../components/loader";
import { uploadAvatar } from "../ultis/uploadFile";
import { registerUser } from "../api/apiUser";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    describe: "",
    password: "",
    cfPassword: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleOpenFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
      // allowsMultipleSelection: true,
    });
    // console.log(result);
    if (result.assets) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.id) {
      handleError("Please input username", "id");
      isValid = false;
    }

    if (!inputs.firstName) {
      handleError("Please input first name", "firstName");
      isValid = false;
    }

    if (!inputs.lastName) {
      handleError("Please input last number", "lastName");
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
    if (!image && isValid === true) {
      Alert.alert("Error", "Hãy chọn avatar");
      isValid = false;
    }
    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    const avatarUrl = await uploadAvatar(image, inputs.id);
    console.log(avatarUrl);
    const newUser = {
      id: inputs.id,
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
      password: inputs.password,
      avatar: avatarUrl,
    };
    const res = await registerUser(newUser);
    if (res.statusCode === "200") {
      navigation.navigate("Login");
      setLoading(false);
      setNotifi(["Đăng ký thành công, kiểm tra email để hoàn tất quá trình"]);
      return;
    }
    setNotifi([res.message], "error");
    setLoading(false);
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
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
      >
        <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: "bold" }}>
          Register
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "id")}
            onFocus={() => handleError(null, "id")}
            iconName="email-outline"
            label="Tên đăng nhập"
            placeholder="Enter username"
            error={errors.id}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "firstName")}
            onFocus={() => handleError(null, "firstName")}
            iconName="account-outline"
            label="Họ"
            placeholder="Enter your first name"
            error={errors.firstName}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "lastName")}
            onFocus={() => handleError(null, "lastName")}
            iconName="account-outline"
            label="Tên"
            placeholder="Enter your last name"
            error={errors.lastName}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "describe")}
            onFocus={() => handleError(null, "describe")}
            iconName="email-outline"
            label="Mô tả"
            placeholder="Enter your describe"
            error={errors.describe}
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
            label="confirm password"
            placeholder="Enter confirm password password"
            error={errors.cfPassword}
            password
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text
              style={{
                color: COLORS.grey,
                fontSize: 18,
                marginVertical: 10,
                marginTop: 30,
              }}
            >
              Avatar
            </Text>
            <View style={{ width: 150, marginLeft: 20 }}>
              <Button title="Chọn ảnh" onPress={handleOpenFile} />
            </View>
          </View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button title="Register" onPress={validate} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

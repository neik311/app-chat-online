import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput, Button } from "@react-native-material/core";
import { userContext } from "../context/userContext";
import { notifiContext } from "../context/notifiContext";
import { updateUser } from "../api/apiUser";
import { uploadAvatar } from "../ultis/uploadFile";

export default function InfoUser() {
  const MAX_SIZE = useRef(5242880);
  const { user, setUser } = useContext(userContext);
  const { setNotifi } = useContext(notifiContext);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [describe, setDescribe] = useState(user?.describe);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOpenFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      // allowsMultipleSelection: true,
    });
    if (result.assets) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const handleSubmit = async () => {
    if (loading === true) {
      return;
    }
    if (!firstName || !lastName) {
      setNotifi(["Họ tên không thể rỗng", "error"]);
      return;
    }
    // if (image?.size > MAX_SIZE.current) {
    //   setNotifi(["Ảnh phải nhỏ hơn 5 mb", "error"]);
    //   return;
    // }
    setLoading(true);
    let url = null;
    if (image) {
      url = await uploadAvatar(image, user?.id);
    }
    let newUser = {
      id: user?.id,
      firstName: firstName,
      lastName: lastName,
      describe: describe,
      avatar: url,
    };
    const res = await updateUser(newUser);
    if (res.statusCode === "200") {
      newUser = user;
      newUser.firstName = firstName || user.firstName;
      newUser.lastName = lastName || user.lastName;
      newUser.describe = describe || user.describe;
      newUser.avatar = url || user.avatar;
      setUser(newUser);
      setLoading(false);
      setNotifi(["Cập nhật dữ liệu thành công"]);
      return;
    }
    setLoading(false);
    setNotifi([res?.message], "error");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E6E6E6" }}>
      <ScrollView>
        <TextInput
          variant="outlined"
          label="Id"
          value={user?.id}
          editable={false}
          style={{ margin: 16, width: "80%" }}
        />
        <TextInput
          variant="outlined"
          label="Email"
          value={user?.email}
          editable={false}
          style={{ margin: 16, width: "80%" }}
        />
        <TextInput
          variant="outlined"
          label="Họ"
          style={{ margin: 16, width: "80%" }}
          onChangeText={(text) => {
            setFirstName(text);
          }}
          value={firstName}
          placeholderTextColor="green"
        />
        <TextInput
          variant="outlined"
          label="Tên"
          style={{ margin: 16, width: "80%" }}
          onChangeText={(text) => {
            setLastName(text);
          }}
          value={lastName}
        />
        <TextInput
          variant="outlined"
          label="Mô tả"
          style={{ margin: 16, width: "80%" }}
          onChangeText={(text) => {
            setDescribe(text);
          }}
          value={describe}
        />
        <View style={styles.viewAvatar}>
          <Text style={styles.textLabel}>Avatar</Text>
          <View style={{ marginLeft: 20 }}>
            <Button title="Chọn" onPress={handleOpenFile} />
          </View>
        </View>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 200,
              height: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        {!loading ? (
          <Button
            title="lưu thay đổi"
            style={styles.btnSave}
            onPress={handleSubmit}
          />
        ) : (
          <ActivityIndicator size={50} style={styles.btnSave} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnSave: {
    marginLeft: "50%",
    width: 160,
    marginTop: 20,
    marginBottom: 10,
  },
  textLabel: {
    fontSize: 18,
    marginVertical: 10,
    marginTop: 5,
  },
  viewAvatar: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
  },
});

import { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Text, Button } from "@react-native-material/core";
import Icon from "react-native-vector-icons/Ionicons";
import Menu from "../components/menu";
import { getUser } from "../api/apiUser";
import { userContext } from "../context/userContext";
import { notifiContext } from "../context/notifiContext";
import {
  createGroup,
  getGroup,
  deleteGroup,
  getGroupByUser,
} from "../api/apiGroup";
import {
  getBlockUser,
  createBlockUser,
  deleteBlockUser,
} from "../api/apiBlock";

export default function SearchScreen({ navigation }) {
  const route = useRoute();
  const { searchQuery } = route.params;
  // console.log(searchQuery);
  const { user, socket } = useContext(userContext);
  const { setNotifi, setLoadData } = useContext(notifiContext);
  const [foundUser, setFoundUser] = useState();
  const [statusButton, setStatusButton] = useState([true, true]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser(searchQuery);
      if (res.statusCode !== "200") {
        return;
      }
      const group = await getGroup(user.id, res?.data?.id);
      const blockUser = await getBlockUser(user.id, res?.data?.id);
      let newStatus = [true, true];
      if (group.data) {
        newStatus[0] = false;
      }
      if (blockUser.data) {
        newStatus[1] = false;
      }
      setFoundUser(res.data);
      setStatusButton(newStatus);
    };
    fetchData();
  }, []);

  const handleGroup = async () => {
    // tạo kết nối
    if (statusButton[0] === true) {
      const res = await createGroup(user.id, foundUser.id);
      if (res.statusCode === "200") {
        setStatusButton([false, statusButton[1]]);
        setLoadData((load) => ++load);
        setNotifi([res?.message]);
        handleConversations();
        return;
      }
      setNotifi([res?.message, "error"]);
      return;
    }
    //hủy kết nối
    const res = await deleteGroup(user.id, foundUser.id);
    // console.log(res);
    if (res.statusCode === "200") {
      setNotifi(["Hủy kết nối thành công"]);
      setStatusButton([true, statusButton[1]]);
      setLoadData((load) => ++load);
      handleConversations();
      return;
    }
    setNotifi(["Đã xảy ra lỗi", "error"]);
  };

  const handleBlock = async () => {
    //chặn người dùng
    if (statusButton[1] === true) {
      const res = await createBlockUser(user.id, foundUser.id);
      if (res.statusCode === "200") {
        setNotifi([`Chặn ${foundUser?.id} thành công`]);
        setStatusButton([true, false]);
        setLoadData((load) => ++load);
        handleConversations();
        return;
      }
      setNotifi([res?.message, "error"]);
      return;
    }
    // hủy chặn
    const res = await deleteBlockUser(user.id, foundUser.id);
    // console.log(res);
    if (res.statusCode === "200") {
      setNotifi([`Hủy Chặn ${foundUser?.id} thành công`]);
      setStatusButton([statusButton[0], true]);
      return;
    }
    setNotifi([res?.message, "error"]);
  };

  const handleConversations = () => {
    socket.emit("sendConversations", {
      senderId: user.id,
      receiveId: foundUser.id,
    });
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.top}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={35}
            color="#084B8A"
            style={{ marginLeft: 15, marginTop: 6 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "#E6E6E6",
          width: "100%",
          height: "100%",
        }}
      >
        <Avatar
          image={{
            uri:
              foundUser?.avatar ||
              "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
          }}
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          size={120}
        />
        <Text
          variant="h5"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}
        >
          {foundUser?.id || "user not found"}
        </Text>
        <Text
          variant="h6"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}
        >
          {foundUser ? foundUser?.firstName + " " + foundUser?.lastName : ""}
        </Text>
        <Text
          variant="h7"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 10,
            maxWidth: "60%",
          }}
        >
          {foundUser?.describe}
        </Text>
        {foundUser && foundUser.id !== user.id && (
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Button
              title={statusButton[0] === true ? "Kết nối" : "Huỷ kết nối"}
              onPress={handleGroup}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <Button
              title={statusButton[1] === true ? "Chặn" : "Hủy chặn"}
              onPress={handleBlock}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </View>
        )}
      </View>
      <Menu navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    height: 50,
    backgroundColor: "#01DFD7",
    marginTop: "10%",
  },
});

import { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Text, TextInput, Avatar } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import * as ImagePicker from "expo-image-picker";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
} from "@react-native-material/core";
import {
  getMessagesInGroup,
  createMessages,
  deleteMessagesInGroup,
} from "../api/apiMessages";
import { uploadImage } from "../ultis/uploadFile";
import { userContext } from "../context/userContext";
import MessageText from "../components/messageText";
import MessageImage from "../components/messageImage";
import Icon from "react-native-vector-icons/Ionicons";
// import Icon from "react-native-vector-icons/FontAwesome";

export default function MessengerScreen({ navigation }) {
  const { user, socket } = useContext(userContext);
  const [deleteMes, setDeleteMes] = useState();
  const route = useRoute();
  const { oppositeUser, groupId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(0);
  const [visible, setVisible] = useState(false);

  const scrollref = useRef();

  useEffect(() => {
    // scrollref.current.scrollTo({ y: messages.length * 50, animated: true });
    scrollref.current.scrollTo({ y: 0, animated: true });
  }, [messages]);

  useEffect(() => {
    socket.on("getMessage", (data) => {
      if (data.senderId === user.id || data.senderId === oppositeUser.id) {
        const arrivalMessage = {
          sender: data.senderId,
          messages: data.text,
          type: data.type,
          createAt: new Date(),
        };
        setMessages((messages) => [arrivalMessage, ...messages]);
      }
    });
    socket.on("getDeleteMessage", () => {
      setLoadData((loadData) => ++loadData);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesInGroup(groupId);
      if (res.statusCode === "200") {
        setMessages(res.data.reverse());
      }
    };
    fetchData();
  }, [loadData]);

  const handleSendMessages = async () => {
    let sendMessage = newMessage;
    if (sendMessage === "" && !image) {
      return;
    }
    let type = "text";
    if (image) {
      type = "image";
      setLoading(true);
      sendMessage = await uploadImage(image, user.id);
    }
    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: oppositeUser.id,
      text: sendMessage,
      type: type,
    });

    const res = await createMessages(groupId, sendMessage, user.id, type);
    if (res.statusCode === "200") {
      setMessages([res.data, ...messages]);
    }
    setLoading(false);
    setImage(null);
    setNewMessage("");
  };

  const handleOpenFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (result.assets) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const hadleDeleteMes = async () => {
    const res = await deleteMessagesInGroup(user.id, deleteMes);
    if (res.statusCode === "200") {
      const newMessages = messages.filter((m) => m.id !== deleteMes);
      setMessages(newMessages);
      socket.emit("deleteMessage", {
        receiverId: oppositeUser.id,
      });
    }
    setVisible(false);
    setDeleteMes(null);
  };

  return (
    <Provider>
      <View style={{ width: "100%", height: "100%" }}>
        {!deleteMes ? (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={35}
                color="#084B8A"
                style={{ marginLeft: 15, marginTop: 15 }}
              />
            </TouchableOpacity>
            <Avatar
              image={{
                uri: oppositeUser.avatar,
              }}
              style={{ marginTop: 5, marginLeft: 20 }}
            />
            <Text variant="h5" style={{ marginLeft: 20, marginTop: 15 }}>
              {oppositeUser.id}
            </Text>
          </View>
        ) : (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={35}
                color="#084B8A"
                style={{ marginLeft: 15, marginTop: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: "25%",
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              onPress={() => {
                setDeleteMes(null);
              }}
            >
              <Icon name="ios-close-circle" size={35} color="#0000FF" />
              <Text style={{ marginTop: 5 }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 25,
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              onPress={() => {
                setVisible(true);
              }}
            >
              <Icon name="trash-outline" size={35} color="#FF0000" />
              <Text style={{ marginTop: 5 }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        <InvertibleScrollView
          inverted
          ref={scrollref}
          // contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          style={{ width: "100%", height: "65%", backgroundColor: "#FAFAFA" }}
        >
          {messages.map((value, index) => {
            return (
              <View key={index}>
                {value.type === "text" ? (
                  <MessageText
                    message={value}
                    user={user}
                    index={index}
                    messages={messages}
                    setDeleteMes={setDeleteMes}
                  />
                ) : (
                  <MessageImage
                    message={value}
                    user={user}
                    index={index}
                    messages={messages}
                    setDeleteMes={setDeleteMes}
                    navigation={navigation}
                  />
                )}
              </View>
            );
          })}
        </InvertibleScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <Icon
            name="image"
            size={30}
            color="#084B8A"
            style={{ marginTop: 25 }}
            onPress={handleOpenFile}
          />
          {!image ? (
            <TextInput
              label=""
              style={styles.textInput}
              onChangeText={(text) => {
                setNewMessage(text);
              }}
              value={newMessage}
            />
          ) : !loading ? (
            <>
              <Image source={{ uri: image }} style={styles.sendImage} />
              <Icon
                name="trash-bin-outline"
                size={30}
                color="red"
                style={{ marginTop: 23, marginRight: 10 }}
                onPress={() => {
                  setImage(null);
                }}
              />
            </>
          ) : (
            <View style={{ width: 150, height: 120 }}>
              <ActivityIndicator
                size="large"
                size={50}
                style={{ marginTop: 20 }}
                // size={50}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={handleSendMessages}
            style={{ marginTop: 25, marginLeft: 15 }}
          >
            <Icon name="send" size={25} color="#0431B4" />
          </TouchableOpacity>
        </View>
      </View>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title="Xác nhận xóa tin nhắn" />
        <DialogActions>
          <Button
            title="Hủy"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
          <Button
            title="Xác nhận"
            compact
            variant="text"
            onPress={hadleDeleteMes}
          />
        </DialogActions>
      </Dialog>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    backgroundColor: "#01DFD7",
    marginTop: "10%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textInput: {
    marginLeft: 20,
    marginBottom: 30,
    width: "70%",
  },
  sendImage: {
    width: 150,
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});

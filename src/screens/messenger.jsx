import { useState, useEffect, useContext, useRef } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput, Avatar } from "@react-native-material/core";
import { useRoute } from "@react-navigation/native";
import { userContext } from "../context/userContext";
import { getMessagesInGroup, createMessages } from "../api/apiMessages";
import Message from "../components/message";
import Icon from "react-native-vector-icons/Ionicons";

export default function MessengerScreen({ navigation }) {
  const { user, socket } = useContext(userContext);
  const route = useRoute();
  const { oppositeUser, groupId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const prevMessage = useRef();

  const scrollref = useRef();

  useEffect(() => {
    scrollref.current.scrollTo({ y: messages.length * 50, animated: true });
  }, [messages]);

  useEffect(() => {
    //console.log("current chat ",currentChat)
    socket.on("getMessage", (data) => {
      if (data.senderId === user.id || data.senderId === oppositeUser.id) {
        const arrivalMessage = {
          sender: data.senderId,
          messages: data.text,
          createAt: new Date(),
        };
        setMessages((messages) => [...messages, arrivalMessage]);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesInGroup(groupId);
      if (res.statusCode === "200") {
        setMessages(res.data);
      }
    };
    fetchData();
  }, []);

  const handleSendMessages = async () => {
    if (newMessage === "") {
      return;
    }

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: oppositeUser.id,
      text: newMessage,
    });

    const res = await createMessages(groupId, newMessage, user.id);
    if (res.statusCode === "200") {
      setMessages([...messages, res.data]);
    }
    setNewMessage("");
  };
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <View
        style={{
          height: 68,
          backgroundColor: "#01DFD7",
          marginTop: "10%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        ref={scrollref}
        style={{ width: "100%", height: "65%", backgroundColor: "#FAFAFA" }}
      >
        {messages.map((value, index) => (
          <Message
            message={value}
            prevMessage={prevMessage}
            user={user}
            key={index}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <TextInput
          label=""
          style={{
            marginLeft: 20,
            marginBottom: 30,
            width: "80%",
          }}
          onChangeText={(text) => {
            setNewMessage(text);
          }}
          value={newMessage}
        />
        <TouchableOpacity
          onPress={handleSendMessages}
          style={{ marginTop: 25, marginLeft: 15 }}
        >
          <Icon name="send" size={25} color="#0431B4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

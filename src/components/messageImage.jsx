import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import moment from "moment";
import Line from "./line";

export default function MessageImage({
  message,
  user,
  index,
  messages,
  setDeleteMes,
  navigation,
}) {
  let lineTime = false;
  if (index === messages.length - 1) {
    lineTime = true;
  } else if (
    moment(message.createAt).format("DD/MM/YYYY") !==
    moment(messages[index + 1].createAt).format("DD/MM/YYYY")
  ) {
    lineTime = true;
  }
  // console.log(message.createAt.toString().split("T")[0]);
  return (
    <>
      {lineTime === true ? <Line time={message.createAt} /> : <></>}
      {user.id === message.sender ? (
        <TouchableOpacity
          style={{
            // width: length,
            height: "auto",
            marginTop: 15,
            marginRight: 15,
            marginLeft: "auto",
          }}
          onLongPress={() => {
            setDeleteMes(message.id);
          }}
          onPress={() => {
            navigation.navigate("ImageDetail", { image: message.messages });
          }}
        >
          <Image
            source={{ uri: message.messages }}
            style={{
              width: 180,
              height: 150,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text
            style={{
              marginTop: 0,
              color: "#0431B4",
              fontSize: 10,
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            {moment(message.createAt).format("hh:mm")}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: 180,
            marginTop: 15,
            marginLeft: 10,
          }}
          onPress={() => {
            navigation.navigate("ImageDetail", { image: message.messages });
          }}
        >
          <Image
            source={{ uri: message.messages }}
            style={{
              width: 180,
              height: 150,
              borderRadius: 20,
              overflow: "hidden",
            }}
          />
          <Text
            style={{
              marginTop: 0,
              color: "#424242",
              fontSize: 10,
              marginLeft: "auto",
              marginRight: 10,
            }}
          >
            {moment(message.createAt).format("hh:mm")}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

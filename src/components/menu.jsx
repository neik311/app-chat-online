// import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Menu() {
  return (
    <View
      style={{
        backgroundColor: "#81F7D8",
        width: "100%",
        height: 60,
        marginTop: "auto",
        marginBottom: 0,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          width: "50%",
        }}
      >
        <Icon
          name="home"
          size={45}
          color="#000"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 3 }}
        />
      </View>
      <View
        style={{
          width: "50%",
        }}
      >
        <Icon
          name="user"
          size={45}
          color="#000"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: 3 }}
        />
      </View>
    </View>
  );
}

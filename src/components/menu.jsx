// import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Menu({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#81F7D8",
        width: "100%",
        height: 55,
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
          onPress={() => {
            navigation.navigate("Home");
          }}
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

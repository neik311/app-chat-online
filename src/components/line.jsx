import { View, Text } from "react-native";
import moment from "moment";

export default function Line({ time }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: "#04B486" }} />
      <View>
        <Text style={{ width: 100, textAlign: "center", color: "#0B6121" }}>
          {moment(time).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: "#04B486" }} />
    </View>
  );
}

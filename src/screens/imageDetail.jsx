import { View, Text, Image, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ImageDetailScreen({ navigation }) {
  const route = useRoute();
  const { image } = route.params;
  const win = Dimensions.get("window");
  return (
    <View style={{ flex: 1, backgroundColor: "#1C1C1C" }}>
      <Icon
        name="arrow-back"
        size={35}
        color="#084B8A"
        size={50}
        style={{ marginLeft: 15, marginTop: 25 }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={{ uri: image }}
        style={{
          width: "100%",
          height: "40%",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      />
    </View>
  );
}

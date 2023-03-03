import React, { useEffect } from "react";
import { View } from "react-native";
import { Snackbar, Button } from "@react-native-material/core";

export default function Notifi({ notifi, setNotifi }) {
  useEffect(() => {
    if (notifi[0]) {
      setTimeout(() => {
        setNotifi([null]);
      }, 1500);
    }
  }, []);

  return (
    <View style={{ flex: 0, display: notifi[0] ? "flex" : "none" }}>
      {!notifi[1] ? (
        <Snackbar
          message={notifi[0]}
          style={{
            position: "absolute",
            start: 16,
            end: 16,
            bottom: 16,
            backgroundColor: "#088A08",
          }}
        />
      ) : (
        <Snackbar
          message={notifi[0]}
          style={{
            position: "absolute",
            start: 16,
            end: 16,
            bottom: 16,
            backgroundColor: "#B40404",
          }}
        />
      )}
    </View>
  );
}

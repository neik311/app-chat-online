import { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "@react-native-material/core";
import { Stack, Avatar } from "@react-native-material/core";
import { ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Conversation() {
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%", height: "62%" }}
      >
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
        <ListItem
          title="List Item 1"
          leadingMode="avatar"
          leading={
            <Avatar
              image={{
                uri: "https://cdnimg.vietnamplus.vn/uploaded/bokttj/2023_01_02/avatar_the_way_of_water.jpg",
              }}
            />
          }
          trailing={(props) => <Icon name="chevron-right" {...props} />}
        />
      </ScrollView>
    </View>
  );
}

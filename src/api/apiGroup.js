import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiURL } from "../config/config";
import { loginByToken } from "./apiUser";

const createGroup = async (sender, receive) => {
  try {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${apiURL}/group/create-group`,
        {
          sender: sender,
          receive: receive,
        },
        { headers: { access_token: accessToken } }
      );
      return res.data;
    };
    let data = await fetchData();
    // console.log(data);
    if (data.statusCode === "410") {
      const user = await loginByToken();
      await AsyncStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getGroupByUser = async (username) => {
  try {
    const res = await axios.get(`${apiURL}/group/get-groups/${username}`);
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getGroup = async (sender, receive) => {
  try {
    const res = await axios.get(
      `${apiURL}/group/get-group/${sender}/${receive}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const deleteGroup = async (sender, receive) => {
  try {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.put(
        `${apiURL}/group/delete-group`,
        {
          sender: sender,
          receive: receive,
        },
        { headers: { access_token: accessToken } }
      );
      return res.data;
    };
    let data = await fetchData();
    // console.log(data);
    if (data.statusCode === "410") {
      const user = await loginByToken();
      await AsyncStorage.setItem("accessToken", user.data.accessToken);
      data = await fetchData();
    }
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
};

export { createGroup, getGroupByUser, getGroup, deleteGroup };

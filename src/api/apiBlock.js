import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiURL } from "../config/config";
import { loginByToken } from "./apiUser";

const getBlockUser = async (blocker, blocked) => {
  try {
    const res = await axios.get(
      `${apiURL}/block-user/get-block-user/${blocker}/${blocked}`
    );
    return res.data;
  } catch (error) {
    console.log(`${error}`);
  }
};

const createBlockUser = async (blocker, blocked) => {
  try {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.post(
        `${apiURL}/block-user/create-block-user`,
        {
          blocker: blocker,
          blocked: blocked,
        },
        { headers: { access_token: accessToken } }
      );
      return res.data;
    };
    let data = await fetchData();
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

const deleteBlockUser = async (blocker, blocked) => {
  try {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const res = await axios.delete(
        `${apiURL}/block-user/delete-block-user/${blocker}/${blocked}`,
        { headers: { access_token: accessToken } }
      );
      return res.data;
    };
    let data = await fetchData();
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

export { getBlockUser, createBlockUser, deleteBlockUser };

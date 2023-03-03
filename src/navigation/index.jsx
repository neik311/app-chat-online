import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";
import HomeScreen from "../screens/home";
import MessengerScreen from "../screens/messenger";
import SearchScreen from "../screens/searchUser";
import ProfileScreen from "../screens/profile";
import { notifiContext } from "../context/notifiContext";
import Notifi from "../components/Notifi";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const { notifi, setNotifi } = useContext(notifiContext);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Messenger" component={MessengerScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {notifi[0] && <Notifi notifi={notifi} setNotifi={setNotifi} />}
    </>
  );
}
export default AppNavigation;

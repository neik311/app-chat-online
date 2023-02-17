// import { StatusBar } from "expo-status-bar";
import { UserProvider } from "./src/context/userContext";
import AppNavigation from "./src/navigation/index";

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}

// import { StatusBar } from "expo-status-bar";
import { UserProvider } from "./src/context/userContext";
import { NotifiProvider } from "./src/context/notifiContext";
import AppNavigation from "./src/navigation/index";

export default function App() {
  return (
    <UserProvider>
      <NotifiProvider>
        <AppNavigation />
      </NotifiProvider>
    </UserProvider>
  );
}

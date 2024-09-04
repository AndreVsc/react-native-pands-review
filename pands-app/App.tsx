import { StatusBar } from "expo-status-bar";
import { AuthRoutes } from "./src/routes/auth.routes";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthRoutes/>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

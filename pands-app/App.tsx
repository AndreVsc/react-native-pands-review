import { StatusBar } from "expo-status-bar";
import { AuthRoutes } from "./src/routes/auth.routes";
import { AuthProvider } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthRoutes/>
      </AuthProvider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

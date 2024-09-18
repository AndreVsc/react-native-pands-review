import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Menu } from "../screens/Menu";
import { Account } from "../screens/Account";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
      <Screen name="Menu" component={Menu} />
      <Screen name="Account" component={Account} />
    </Navigator>
  );
}
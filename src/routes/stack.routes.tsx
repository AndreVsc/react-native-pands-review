import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Menu } from '../screens/Menu';

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
      <Screen name="Menu" component={Menu} />
    </Navigator>
  );
}
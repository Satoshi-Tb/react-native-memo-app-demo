import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { LogInScreen } from "./src/screens/LogInScreen";
import { MemoCreateScreen } from "./src/screens/MemoCreateScreen";
import { MemoDetailScreen } from "./src/screens/MemoDetailScreen";
import { MemoEditScreen } from "./src/screens/MemoEditScreen";
import { MemoListScreen } from "./src/screens/MemoListScreen";
import { SignUpScreen } from "./src/screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerStyle: { backgroundColor: "#467FD3" },
          headerTitleStyle: { color: "#ffffff" },
          headerTitle: "Memo App",
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
          headerBackTitle: "Back",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen name="MemoCreate" component={MemoCreateScreen} />
        <Stack.Screen name="MemoDetail" component={MemoDetailScreen} />
        <Stack.Screen name="MemoEdit" component={MemoEditScreen} />
        <Stack.Screen name="MemoList" component={MemoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

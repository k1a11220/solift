import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Icon from "./assets/icons";
import ObjectiveDetailScreen from "./src/screens/ObjectiveDetail";
import HomeScreen from "./src/screens/Home";
import KeyResultDetailScreen from "./src/screens/KeyResultDetail";
import FloatingBtn from "./src/components/FloatingBtn";

import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";
import ExampleView from "./src/components/ExampleView";
import ExampleInput from "./src/components/ExampleInput";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <ExampleView />
      <ExampleInput />
      {/* <NavigationContainer>
        <SafeAreaView />
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ObjectiveDetail"
            component={ObjectiveDetailScreen}
            options={({ navigation, route }) => ({
              headerBackTitleVisible: false,
              headerTitle: "",
              headerShadowVisible: false, // applied here
              headerTintColor: "#333D4B",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ width: 26, height: 26 }}
                >
                  <Icon.Chevron fillColor="#333D4B" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="KeyResultDetail"
            component={KeyResultDetailScreen}
            options={({ navigation, route }) => ({
              headerBackTitleVisible: false,
              headerTitle: "",
              headerShadowVisible: false, // applied here
              headerTintColor: "#333D4B",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ width: 26, height: 26 }}
                >
                  <Icon.Chevron fillColor="#333D4B" />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
        <FloatingBtn />
      </NavigationContainer> */}
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

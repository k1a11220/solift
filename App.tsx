import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeScreen from "./src/screens/Home";
import ObjectiveDetailScreen from "./src/screens/ObjectiveDetail";
import * as Icon from "./assets/icons";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
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

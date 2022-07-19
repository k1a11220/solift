import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import * as Icon from "./assets/icons";
import ObjectiveDetailScreen from "./src/screens/ObjectiveDetail";
import HomeScreen from "./src/screens/Home";
import KeyResultDetailScreen from "./src/screens/KeyResultDetail";
import FloatingBtn from "./src/components/FloatingBtn";

import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";
import CreateInitiativeScreen from "./src/screens/CreateInitiative";
import { useState } from "react";
import { Objective } from "./src/libs/types";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initiative, setInitiative] = useState({
    name: "",
    deadline: new Date(),
    hasDone: false,
  });
  const [initiatives, setInitiatives] = useState([]);

  const handleInitiative = () => {
    let newInitiative = initiative;
    let newInitiatives = [newInitiative, ...initiatives];
    setInitiatives(newInitiatives);
    setInitiative("");
    console.log(initiatives);
  };

  const [objective, setObjective] = useState<Objective>({
    id: null,
    name: null,
    deadline: null,
    keyResults: [],
  });

  const [objectives, setObjectives] = useState<Objective[]>([]);

  const handleObjective = () => {
    let newObjective = objective;
    let newObjectives = [newObjective, ...objectives];
    setObjectives(newObjectives);
    setObjective({
      id: null,
      name: null,
      deadline: null,
      keyResults: [],
    });
    console.log(objectives);
  };

  return (
    <StoreProvider store={store}>
      {/* <ExampleView />
      <ExampleInput /> */}
      <NavigationContainer>
        <SafeAreaView />
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={({ navigation, route }) => ({
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
        >
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} objectives={objectives} />}
          </Stack.Screen>
          <Stack.Screen
            name="ObjectiveDetail"
            component={ObjectiveDetailScreen}
          />
          <Stack.Screen name="KeyResultDetail">
            {(props) => (
              <KeyResultDetailScreen {...props} initiatives={initiatives} />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateInitiative">
            {(props) => (
              <CreateInitiativeScreen
                {...props}
                initiative={initiative}
                handleInitiative={handleInitiative}
                setInitiative={setInitiative}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        <FloatingBtn to={"CreateInitiative"} />
      </NavigationContainer>
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

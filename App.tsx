import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import * as Icon from "./assets/icons";
import ObjectiveDetailScreen from "./src/screens/ObjectiveDetail";
import HomeScreen from "./src/screens/Home";
import KeyResultDetailScreen from "./src/screens/KeyResultDetail";
import FloatingBtn from "./src/components/FloatingBtn";

import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";
import CreateInitiativeScreen from "./src/screens/CreateInitiative";
import { useState } from "react";
import { Initiative, KeyResult, Objective } from "./src/libs/types";
import CreateObjectiveScreen from "./src/screens/CreateObjective";
import CreateKeyResultScreen from "./src/screens/CreateKeyResult";
import EditObjectiveScreen from "./src/screens/EditObjective";
import EditKeyResultScreen from "./src/screens/EditKeyResult";

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("");

  const [currentObjectiveId, setCurrentObjectiveId] = useState();
  const [latestObjectiveId, setLatestObjectiveId] = useState(0);
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
  };

  const deleteObjective = (id: number, action) => {
    action();
    let newObjectives = objectives.filter((objective) => objective.id !== id);
    setObjectives(newObjectives);
  };

  const deleteAlert = (id, action) =>
    Alert.alert("삭제하기", "정말 삭제하시겠어요?", [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "삭제하기",
        onPress: () =>
          currentRoute === "EditObjective"
            ? deleteObjective(id, action)
            : currentRoute === "EditKeyResult"
            ? deleteKeyResult(id, action)
            : null,
      },
    ]);

  const [currentKeyResultId, setCurrentKeyResultId] = useState();
  const [latestKeyResultId, setLatestKeyResultId] = useState(0);
  const [keyResult, setKeyResult] = useState<KeyResult>({
    id: null,
    name: null,
    deadline: null,
    initiatives: [],
    objectiveId: null,
  });

  const [keyResults, setKeyResults] = useState<Objective[]>([]);
  const handleKeyResult = () => {
    let newKeyResult = keyResult;
    let newKeyResults = [newKeyResult, ...keyResults];
    setKeyResults(newKeyResults);
    setKeyResult({
      id: null,
      name: null,
      deadline: null,
      initiatives: [],
      objectiveId: null,
    });
  };

  const deleteKeyResult = (id: number, action) => {
    action();
    let newKeyResults = keyResults.filter((keyResult) => keyResult.id !== id);
    setKeyResults(newKeyResults);
  };

  const [latestInitiativeId, setLatestInitiativeId] = useState(0);
  const [initiative, setInitiative] = useState<Initiative>({
    id: null,
    name: null,
    deadline: null,
    keyResultId: null,
    hasDone: false,
  });
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  const deleteInitiative = (id: number) => {
    let newInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    setInitiatives(newInitiatives);
  };

  const handleInitiative = () => {
    let newInitiative = initiative;
    let newInitiatives = [newInitiative, ...initiatives];
    setInitiatives(newInitiatives);
    setInitiative({
      id: null,
      name: null,
      deadline: null,
      keyResultId: null,
      hasDone: false,
    });
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
            headerRight: () =>
              currentRoute === "ObjectiveDetail" ? (
                <TouchableOpacity
                  style={styles.rightItemContainer}
                  onPress={() =>
                    navigation.navigate("EditObjective", { currentObjectiveId })
                  }
                >
                  <Text style={styles.rightItemText}>편집</Text>
                </TouchableOpacity>
              ) : currentRoute === "KeyResultDetail" ? (
                <TouchableOpacity
                  style={styles.rightItemContainer}
                  onPress={() =>
                    navigation.navigate("EditKeyResult", { currentKeyResultId })
                  }
                >
                  <Text style={styles.rightItemText}>편집</Text>
                </TouchableOpacity>
              ) : currentRoute === "EditObjective" ? (
                <TouchableOpacity
                  style={styles.rightItemContainer}
                  onPress={() =>
                    deleteAlert(currentObjectiveId, () => navigation.pop(2))
                  }
                >
                  <Text style={[styles.rightItemText, { color: "#FF5252" }]}>
                    삭제
                  </Text>
                </TouchableOpacity>
              ) : currentRoute === "EditKeyResult" ? (
                <TouchableOpacity
                  style={styles.rightItemContainer}
                  onPress={() =>
                    deleteAlert(currentKeyResultId, () => navigation.pop(2))
                  }
                >
                  <Text style={[styles.rightItemText, { color: "#FF5252" }]}>
                    삭제
                  </Text>
                </TouchableOpacity>
              ) : null,
          })}
        >
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <HomeScreen
                {...props}
                objectives={objectives}
                keyResults={keyResults}
                initiatives={initiatives}
                setCurrentRoute={setCurrentRoute}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="ObjectiveDetail">
            {(props) => (
              <ObjectiveDetailScreen
                {...props}
                setCurrentRoute={setCurrentRoute}
                keyResults={keyResults}
                setCurrentObjectiveId={setCurrentObjectiveId}
                initiatives={initiatives}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="KeyResultDetail">
            {(props) => (
              <KeyResultDetailScreen
                {...props}
                objectives={objectives}
                keyResults={keyResults}
                initiatives={initiatives}
                setInitiative={setInitiative}
                setCurrentRoute={setCurrentRoute}
                setCurrentKeyResultId={setCurrentKeyResultId}
                deleteInitiative={deleteInitiative}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateObjective">
            {(props) => (
              <CreateObjectiveScreen
                {...props}
                objective={objective}
                setObjective={setObjective}
                handleObjective={handleObjective}
                latestObjectiveId={latestObjectiveId}
                setLatestObjectiveId={setLatestObjectiveId}
                setCurrentRoute={setCurrentRoute}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateKeyResult">
            {(props) => (
              <CreateKeyResultScreen
                {...props}
                keyResult={keyResult}
                setKeyResult={setKeyResult}
                handleKeyResult={handleKeyResult}
                latestKeyResultId={latestKeyResultId}
                setLatestKeyResultId={setLatestKeyResultId}
                currentObjectiveId={currentObjectiveId}
                setCurrentRoute={setCurrentRoute}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateInitiative">
            {(props) => (
              <CreateInitiativeScreen
                {...props}
                initiative={initiative}
                setInitiative={setInitiative}
                handleInitiative={handleInitiative}
                currentKeyResultId={currentKeyResultId}
                setCurrentRoute={setCurrentRoute}
                latestInitiativeId={latestInitiativeId}
                setLatestInitiativeId={setLatestInitiativeId}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EditObjective">
            {(props) => (
              <EditObjectiveScreen
                objectives={objectives}
                setCurrentRoute={setCurrentRoute}
                {...props}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="EditKeyResult">
            {(props) => (
              <EditKeyResultScreen
                keyResults={keyResults}
                setCurrentRoute={setCurrentRoute}
                {...props}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
        {currentRoute === "Home" ? (
          <FloatingBtn currentRoute={currentRoute} />
        ) : currentRoute === "ObjectiveDetail" ? (
          <FloatingBtn currentRoute={currentRoute} />
        ) : currentRoute === "KeyResultDetail" ? (
          <FloatingBtn currentRoute={currentRoute} />
        ) : null}
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

  rightItemContainer: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 36,
  },

  rightItemText: {
    fontSize: 18,
    color: "#4191FD",
    fontWeight: "600",
  },
});

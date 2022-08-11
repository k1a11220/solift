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
import { useEffect, useState } from "react";
import { Initiative, KeyResult, Objective } from "./src/libs/types";
import CreateObjectiveScreen from "./src/screens/CreateObjective";
import CreateKeyResultScreen from "./src/screens/CreateKeyResult";
import EditObjectiveScreen from "./src/screens/EditObjective";
import EditKeyResultScreen from "./src/screens/EditKeyResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./src/libs/theme";
import EditInitiativeScreen from "./src/screens/EditInitiative";
import * as Device from "expo-device";

const Stack = createNativeStackNavigator();

export default function App() {
  const [deviceName, setDeviceName] = useState("");

  useEffect(() => {
    const getDeviceName = async () => {
      if (Device.deviceName !== null) {
        const deviceName = await Device.deviceName;
        setDeviceName(deviceName);
      }
    };
    getDeviceName();
  }, []);

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

    AsyncStorage.setItem("objectives", JSON.stringify(newObjectives))
      .then(() => {
        setObjectives(newObjectives);
      })
      .catch((error) => console.log(error));
  };

  const deleteObjective = (id: number, action: any) => {
    action === undefined ? null : action();

    let newObjectives = objectives.filter((objective) => objective.id !== id);

    // 삭제할 key result 리스트
    let deleteKeyResultList = keyResults.filter(
      (keyResult) => keyResult.objectiveId == id
    );

    // 삭제할 keyResult Id 리스트
    let deleteKeyResultIdList = deleteKeyResultList.filter(
      (initiative) => initiative.id
    );

    let deleteAllKeyResult = () =>
      deleteKeyResultIdList.map((keyResult) => {
        deleteKeyResult(+keyResult.toString(), console.log("deleted"));
      });

    deleteAllKeyResult();

    AsyncStorage.setItem("objectives", JSON.stringify(newObjectives))
      .then(() => {
        setObjectives(newObjectives);
      })
      .catch((error) => console.log(error));
  };

  const deleteAlert = (id: number, action: any) =>
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

  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);
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

    AsyncStorage.setItem("keyResults", JSON.stringify(newKeyResults))
      .then(() => {
        setKeyResults(newKeyResults);
      })
      .catch((error) => console.log(error));
  };

  const deleteKeyResult = (id: number, action: any) => {
    action === undefined ? null : action();

    let newKeyResults = keyResults.filter((keyResult) => keyResult.id !== id);
    setKeyResults(newKeyResults);

    let newInitiatives = initiatives.filter((initiative) => {
      return initiative.keyResultId !== id;
    });

    AsyncStorage.setItem("keyResults", JSON.stringify(newKeyResults))
      .then(() => {
        setKeyResults(newKeyResults);
      })
      .catch((error) => console.log(error));

    AsyncStorage.setItem("initiatives", JSON.stringify(newInitiatives))
      .then(() => {
        setInitiatives(newInitiatives);
      })
      .catch((error) => console.log(error));
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
    AsyncStorage.setItem("initiatives", JSON.stringify(newInitiatives))
      .then(() => {
        setInitiatives(newInitiatives);
      })
      .catch((error) => console.log(error));
  };

  const deleteInitiative = (id: number) => {
    let newInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    setInitiatives(newInitiatives);

    AsyncStorage.setItem("initiatives", JSON.stringify(newInitiatives))
      .then(() => {
        setInitiatives(newInitiatives);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadObjectives();
    loadKeyResults();
    loadInitiatives();
    loadLatestObjectiveId();
    loadLatestKeyResultId();
    loadLatestInitiativeId();
  }, []);

  const loadObjectives = () => {
    AsyncStorage.getItem("objectives")
      .then((data) => {
        if (data !== null) {
          setObjectives(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  const loadKeyResults = () => {
    AsyncStorage.getItem("keyResults")
      .then((data) => {
        if (data !== null) {
          setKeyResults(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  const loadInitiatives = () => {
    AsyncStorage.getItem("initiatives")
      .then((data) => {
        if (data !== null) {
          setInitiatives(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  const loadLatestObjectiveId = () => {
    AsyncStorage.getItem("latestObjectiveId")
      .then((data) => {
        if (data !== null) {
          setLatestObjectiveId(+data);
        }
      })
      .catch((error) => console.log(error));
  };

  const loadLatestKeyResultId = () => {
    AsyncStorage.getItem("latestKeyResultId")
      .then((data) => {
        if (data !== null) {
          setLatestKeyResultId(+data);
        }
      })
      .catch((error) => console.log(error));
  };

  const loadLatestInitiativeId = () => {
    AsyncStorage.getItem("latestInitiativeId")
      .then((data) => {
        if (data !== null) {
          setLatestInitiativeId(+data);
        }
      })
      .catch((error) => console.log(error));
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
            headerTintColor: theme.colors.grey500,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ width: 26, height: 26 }}
              >
                <Icon.Chevron fillColor={theme.colors.grey500} />
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
                  onPress={
                    currentObjectiveId !== undefined
                      ? () =>
                          deleteAlert(currentObjectiveId, () =>
                            navigation.pop(2)
                          )
                      : () => alert("currentObjectiveId undefined!")
                  }
                >
                  <Text
                    style={[
                      styles.rightItemText,
                      { color: theme.colors.red500 },
                    ]}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>
              ) : currentRoute === "EditKeyResult" ? (
                <TouchableOpacity
                  style={styles.rightItemContainer}
                  onPress={
                    currentKeyResultId !== undefined
                      ? () =>
                          deleteAlert(currentKeyResultId, () =>
                            navigation.pop(2)
                          )
                      : () => alert("currentObjectiveId undefined!")
                  }
                >
                  <Text
                    style={[
                      styles.rightItemText,
                      { color: theme.colors.red500 },
                    ]}
                  >
                    삭제
                  </Text>
                </TouchableOpacity>
              ) : null,
          })}
        >
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => (
              <HomeScreen
                objectives={objectives}
                keyResults={keyResults}
                initiatives={initiatives}
                setCurrentRoute={setCurrentRoute}
                setInitiative={setInitiative}
                {...props}
              />
            )}
          </Stack.Screen>
          {objectives.length === 0 ? null : (
            <Stack.Screen name="ObjectiveDetail">
              {(props) => (
                <ObjectiveDetailScreen
                  setCurrentRoute={setCurrentRoute}
                  keyResults={keyResults}
                  setCurrentObjectiveId={setCurrentObjectiveId}
                  initiatives={initiatives}
                  setObjectives={setObjectives}
                  objectives={objectives}
                  {...props}
                />
              )}
            </Stack.Screen>
          )}

          <Stack.Screen name="KeyResultDetail">
            {(props) => (
              <KeyResultDetailScreen
                objectives={objectives}
                keyResults={keyResults}
                initiatives={initiatives}
                setInitiatives={setInitiatives}
                setCurrentRoute={setCurrentRoute}
                setCurrentKeyResultId={setCurrentKeyResultId}
                deleteInitiative={deleteInitiative}
                {...props}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="CreateObjective">
            {(props) => (
              <CreateObjectiveScreen
                objective={objective}
                setObjective={setObjective}
                handleObjective={handleObjective}
                latestObjectiveId={latestObjectiveId}
                setLatestObjectiveId={setLatestObjectiveId}
                setCurrentRoute={setCurrentRoute}
                {...props}
              />
            )}
          </Stack.Screen>
          {currentObjectiveId !== undefined ? (
            <Stack.Screen name="CreateKeyResult">
              {(props) => (
                <CreateKeyResultScreen
                  keyResult={keyResult}
                  setKeyResult={setKeyResult}
                  handleKeyResult={handleKeyResult}
                  latestKeyResultId={latestKeyResultId}
                  setLatestKeyResultId={setLatestKeyResultId}
                  currentObjectiveId={currentObjectiveId}
                  setCurrentRoute={setCurrentRoute}
                  objectives={objectives}
                  {...props}
                />
              )}
            </Stack.Screen>
          ) : null}
          {currentKeyResultId !== undefined ? (
            <Stack.Screen name="CreateInitiative">
              {(props) => (
                <CreateInitiativeScreen
                  initiative={initiative}
                  setInitiative={setInitiative}
                  handleInitiative={handleInitiative}
                  keyResults={keyResults}
                  currentKeyResultId={currentKeyResultId}
                  setCurrentRoute={setCurrentRoute}
                  latestInitiativeId={latestInitiativeId}
                  setLatestInitiativeId={setLatestInitiativeId}
                  {...props}
                />
              )}
            </Stack.Screen>
          ) : null}
          <Stack.Screen name="EditObjective">
            {(props) => (
              <EditObjectiveScreen
                objectives={objectives}
                setObjectives={setObjectives}
                setCurrentRoute={setCurrentRoute}
                {...props}
              />
            )}
          </Stack.Screen>
          {currentObjectiveId !== undefined ? (
            <Stack.Screen name="EditKeyResult">
              {(props) => (
                <EditKeyResultScreen
                  keyResults={keyResults}
                  setCurrentRoute={setCurrentRoute}
                  currentObjectiveId={currentObjectiveId}
                  objectives={objectives}
                  setKeyResults={setKeyResults}
                  {...props}
                />
              )}
            </Stack.Screen>
          ) : null}
          {currentKeyResultId !== undefined ? (
            <Stack.Screen name="EditInitiative">
              {(props) => (
                <EditInitiativeScreen
                  initiatives={initiatives}
                  setCurrentRoute={setCurrentRoute}
                  currentKeyResultId={currentKeyResultId}
                  setInitiatives={setInitiatives}
                  {...props}
                />
              )}
            </Stack.Screen>
          ) : null}
        </Stack.Navigator>
        {currentRoute === "Home" || "ObjectiveDetail" || "KeyResultDetail" ? (
          <FloatingBtn
            deviceName={deviceName}
            latestObjectiveId={latestObjectiveId}
            currentRoute={currentRoute}
            currentObjectiveId={currentObjectiveId}
            latestKeyResultId={latestKeyResultId}
            currentKeyResultId={currentKeyResultId}
            latestInitiativeId={latestInitiativeId}
          />
        ) : null}
      </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
    color: theme.colors.blue500,
    fontWeight: "600",
  },
});

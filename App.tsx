import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import * as Icon from "./assets/icons";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Icon.ArrowUp />
    </View>
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

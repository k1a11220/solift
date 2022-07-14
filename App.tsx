import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeIconOutline from "./assets/icons/HomeIconOutline";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HomeIconOutline size={24} color="red" />
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

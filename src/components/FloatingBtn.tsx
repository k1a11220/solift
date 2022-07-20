import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "../../assets/icons";
import { useEffect } from "react";
import { ROUTES } from "../libs/types";

const FloatingBtn = () => {
  const navigation = useNavigation<ROUTES>();
  const currentScreen = navigation?.getCurrentRoute()?.name;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          currentScreen === "Home"
            ? "CreateObjective"
            : currentScreen === "ObjectiveDetail"
            ? "CreateKeyResult"
            : currentScreen === "KeyResultDetail"
            ? "CreateInitiative"
            : "CreateObjective"
        )
      }
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Icon.Create fillColor={"#ffffff"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4191FD",
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    position: "absolute",
    bottom: 44,
    right: 22,
  },

  iconContainer: {
    width: 26,
    height: 26,
  },
});

export default FloatingBtn;

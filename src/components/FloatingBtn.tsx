import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "../../assets/icons";
import { ROUTES } from "../libs/types";

const FloatingBtn = ({ currentRoute }: string) => {
  const navigation = useNavigation<ROUTES>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          currentRoute === "Home"
            ? "CreateObjective"
            : currentRoute === "ObjectiveDetail"
            ? "CreateKeyResult"
            : currentRoute === "KeyResultDetail"
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

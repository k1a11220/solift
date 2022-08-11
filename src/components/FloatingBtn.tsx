import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "../../assets/icons";
import { ROUTES } from "../libs/types";
import * as Haptics from "expo-haptics";
import { theme } from "../libs/theme";
import {
  onPressCreateInitiative,
  onPressCreateKeyResult,
  onPressCreateObjective,
} from "../utils/firebaseAnalytics";

interface FloatingBtnProps {
  currentRoute: string;
  deviceName: string;
  latestObjectiveId: number;
  currentObjectiveId: number;
  latestKeyResultId: number;
  currentKeyResultId: number;
  latestInitiativeId: number;
}

const FloatingBtn = ({
  currentRoute,
  deviceName,
  latestObjectiveId,
  currentObjectiveId,
  latestKeyResultId,
  currentKeyResultId,
  latestInitiativeId,
}: FloatingBtnProps) => {
  const navigation = useNavigation<ROUTES>();
  return (
    <TouchableOpacity
      onPress={() => {
        currentRoute === "Home"
          ? onPressCreateObjective(deviceName, latestObjectiveId)
          : currentRoute === "ObjectiveDetail"
          ? onPressCreateKeyResult(
              deviceName,
              currentObjectiveId,
              latestKeyResultId
            )
          : currentRoute === "KeyResultDetail"
          ? onPressCreateInitiative(
              deviceName,
              currentKeyResultId,
              latestInitiativeId
            )
          : null;
        navigation.navigate(
          currentRoute === "Home"
            ? "CreateObjective"
            : currentRoute === "ObjectiveDetail"
            ? "CreateKeyResult"
            : currentRoute === "KeyResultDetail"
            ? "CreateInitiative"
            : "CreateObjective"
        );
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Icon.Create fillColor={theme.colors.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blue500,
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

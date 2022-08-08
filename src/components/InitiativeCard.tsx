import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";
import * as Haptics from "expo-haptics";
import { Initiative } from "../libs/types";
import { getCurrentInitiative } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface InitiativeCardProps {
  initiative: Initiative;
  initiatives: Initiative[];
  setInitiatives: any;
  onPress: () => void;
}

const InitiativeCard = ({
  initiatives,
  initiative,
  onPress,
  setInitiatives,
}: InitiativeCardProps) => {
  const currentIntitiative =
    initiative.id !== null
      ? getCurrentInitiative(initiatives, initiative.id)
      : null;
  const [hasDone, setHasDone] = useState(currentIntitiative?.hasDone);

  const onClick = () => {
    onPress();
    initiative.hasDone = !initiative.hasDone;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    let filteredInitiatives = initiatives.filter(
      (initiative) => initiative.id !== currentIntitiative?.id
    );
    let edited = [
      ...filteredInitiatives,
      {
        id: currentIntitiative?.id,
        name: currentIntitiative?.name,
        hasDone: !hasDone,
        deadline: currentIntitiative?.deadline,
        keyResultId: currentIntitiative?.keyResultId,
      },
    ];
    edited.sort(function (a, b) {
      if (
        a.id !== null &&
        b.id !== null &&
        a.id !== undefined &&
        b.id !== undefined
      ) {
        return a.id - b.id;
      } else {
        return 0;
      }
    });
    AsyncStorage.setItem("initiatives", JSON.stringify(edited))
      .then(() => {
        setInitiatives(edited);
      })
      .catch((err) => {
        console.log(err);
      });
    setHasDone(currentIntitiative?.hasDone);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onClick}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.deadline, hasDone ? styles.done : null]}>
          {currentIntitiative?.deadline}까지
        </Text>
        <Text style={[styles.title, hasDone ? styles.done : null]}>
          {currentIntitiative?.name}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon.CheckCircleOutline fillColor={hasDone ? "#4191FD" : "#C3C9D3"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EDEFF1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#FFF",
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    maxWidth: "87%",
  },
  deadline: {
    fontSize: 13,
    fontWeight: "500",
    color: "#8B919E",
    marginBottom: 7,
  },
  title: {
    fontSize: 16,
    color: "#333D4B",
    fontWeight: "600",
    lineHeight: 16 * 1.4,
  },
  done: {
    textDecorationLine: "line-through",
  },
});

export default InitiativeCard;

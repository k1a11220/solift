import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";
import * as Haptics from "expo-haptics";

interface InitiativeCardProps {
  name: string;
  deadline: Date;
  hasDone: boolean;
}

const InitiativeCard = ({ name, deadline }: InitiativeCardProps) => {
  const [hasDone, setHasDone] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => {
        setHasDone(!hasDone);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.deadline, hasDone ? styles.done : null]}>
          {deadline.toLocaleDateString()}
        </Text>
        <Text style={[styles.title, hasDone ? styles.done : null]}>{name}</Text>
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
  },
  done: {
    textDecorationLine: "line-through",
  },
});

export default InitiativeCard;

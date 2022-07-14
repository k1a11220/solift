import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Icon from "../../assets/icons";

const InitiativeCard = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.deadline}>10/7까지</Text>
        <Text style={styles.title}>사용자를 사로잡는 UX/UI 실전 가이드</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon.CheckCircleOutline fillColor={"#C3C9D3"} />
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
});

export default InitiativeCard;

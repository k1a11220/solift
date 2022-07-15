import { ScrollView, StyleSheet, Text, View } from "react-native";
import Title from "../components/Title";
import * as Icon from "../../assets/icons";
import InitiativeCard from "../components/InitiativeCard";

const KeyResultDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.objectiveName}>디자인 방법론 공부하기</Text>
        <Text style={styles.keyResultName}>디자인 서적 4권 읽기</Text>
        <View style={styles.dateContainer}>
          <View style={styles.iconContainer}>
            <Icon.CalendarOutline fillColor={"#8B919E"} />
          </View>
          <Text style={styles.date}>2023/02/20</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>
      <View style={styles.cardList}>
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 22,
  },

  iconContainer: {
    width: 17,
    height: 17,
    marginRight: 6,
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 6,
    backgroundColor: "#EDEFF1",
    borderRadius: 6,
  },

  progressBar: {
    backgroundColor: "#4191FD",
    width: "50%",
    height: "100%",
    borderRadius: 6,
  },

  objectiveName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#8B919E",
    marginBottom: 6,
  },

  keyResultName: {
    fontSize: 22,
    color: "#333D4B",
    fontWeight: "bold",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 22,
  },

  date: {
    color: "#8B919E",
  },

  cardList: {
    marginTop: 22,
  },
});

export default KeyResultDetailScreen;

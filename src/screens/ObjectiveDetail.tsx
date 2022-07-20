import { useEffect } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Gap from "../components/Gap";
import ProgressCard from "../components/ProgressCard";
import Title from "../components/Title";

const ObjectiveDetailScreen = ({
  navigation,
  route,
  setCurrentRoute,
  setCurrentObjectiveId,
}: any) => {
  useEffect(() => {
    setCurrentRoute("ObjectiveDetail");
    setCurrentObjectiveId(route.params.objective.id);
  });
  return (
    <ScrollView style={styles.container}>
      <Title title={route.params.objective.name} type="default" />
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>진행도</Text>
          <Text style={styles.infoCardValue}>50%</Text>
        </View>
        <Gap />
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>마감일</Text>
          <Text style={styles.infoCardValue}>
            {route.params.objective.deadline}
          </Text>
        </View>
      </View>
      <View style={styles.cardList}>
        <ProgressCard navigation={navigation} />
        <ProgressCard navigation={navigation} />
        <ProgressCard navigation={navigation} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 22,
    paddingRight: 22,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 24,
    width: "100%",
  },
  infoCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    paddingBottom: 22,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EDEFF1",
    flex: 1,
  },
  infoCardTitle: {
    fontSize: 12,
    marginBottom: 4,
    color: "#8B919E",
  },
  infoCardValue: {
    fontSize: 18,
    color: "#333D4B",
    fontWeight: "600",
  },
  cardList: {
    justifyContent: "space-between",
    paddingTop: 16,
  },
});

export default ObjectiveDetailScreen;

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

const ObjectiveDetailScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>디자인 방법론 공부하기</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>진행도</Text>
          <Text style={styles.infoCardValue}>50%</Text>
        </View>
        <Gap />
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>마감일</Text>
          <Text style={styles.infoCardValue}>2023/02/11</Text>
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
  },
  title: {
    fontSize: 22,
    paddingTop: 22,
    paddingBottom: 12,
    paddingLeft: 22,
    paddingRight: 22,
    fontWeight: "700",
    color: "#333D4B",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: 22,
    paddingRight: 22,
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
    paddingLeft: 22,
    paddingRight: 22,
  },
});

export default ObjectiveDetailScreen;

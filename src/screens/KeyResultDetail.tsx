import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Icon from "../../assets/icons";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";

const KeyResultDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Title title="디자인 도서 4권 읽기" type="progress" />
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

  cardList: {
    marginTop: 22,
  },
});

export default KeyResultDetailScreen;

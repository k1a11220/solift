import { ScrollView, StyleSheet, View } from "react-native";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";

const KeyResultDetailScreen = ({ ...props }) => {
  const currentKeyResult = props?.keyResults?.find(
    (keyResult) => keyResult?.id === props?.route?.params?.id
  );
  const currentObjective = props?.objectives?.find(
    (objective) => objective?.id === currentKeyResult?.objectiveId
  );
  return (
    <ScrollView style={styles.container}>
      <Title
        title={currentKeyResult?.name}
        subtitle={currentObjective?.name}
        progress={34}
        date={currentKeyResult?.deadline}
        type="progress"
      />
      <View style={styles.cardList}>
        {props.initiatives.map((initiative, index) => (
          <InitiativeCard
            key={index}
            name={initiative.name}
            deadline={initiative.deadline}
            onPress={() => {
              props.navigation.navigate("KeyResultDetail", {
                initiative: initiative,
              });
            }}
          />
        ))}
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

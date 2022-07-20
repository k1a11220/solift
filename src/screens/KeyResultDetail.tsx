import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";

const KeyResultDetailScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("KeyResultDetail");
    props.setCurrentKeyResultId(props.route.params.id);
  });
  const currentKeyResult = props?.keyResults?.find(
    (keyResult) => keyResult?.id === props?.route?.params?.id
  );
  const currentObjective = props?.objectives?.find(
    (objective) => objective?.id === currentKeyResult?.objectiveId
  );
  const filteredInitiatives = props.initiatives.filter(
    (initiative: any) => initiative.keyResultId === currentKeyResult.id
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
        {filteredInitiatives.map((initiative) => (
          <InitiativeCard
            key={initiative.id}
            initiative={initiative}
            id={initiative.id}
            name={initiative.name}
            deadline={initiative.deadline}
            setInitiative={props.setInitiative}
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
    paddingLeft: 22,
    paddingRight: 22,
  },

  cardList: {
    marginTop: 22,
  },
});

export default KeyResultDetailScreen;

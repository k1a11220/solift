import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyView from "../components/EmptyView";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";

const KeyResultDetailScreen = ({ ...props }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    props.setCurrentRoute("KeyResultDetail");
    props.setCurrentKeyResultId(props.route.params.id);
  }, [props, isFocused]);
  const currentKeyResult = props?.keyResults?.find(
    (keyResult) => keyResult?.id === props?.route?.params?.id
  );
  const currentObjective = props?.objectives?.find(
    (objective) => objective?.id === currentKeyResult?.objectiveId
  );
  const filteredInitiatives = props.initiatives.filter(
    (initiative: any) => initiative.keyResultId === currentKeyResult.id
  );
  const newProgress =
    (filteredInitiatives.filter((initiative) => initiative.hasDone === true)
      .length /
      filteredInitiatives.length) *
    100;
  const [progress, setProgress] = useState(newProgress);

  return (
    <ScrollView style={styles.container}>
      <Title
        title={currentKeyResult?.name}
        subtitle={currentObjective?.name}
        progress={newProgress}
        date={currentKeyResult?.deadline}
        type="progress"
      />
      <View style={styles.cardList}>
        {filteredInitiatives.length === 0 ? (
          <EmptyView
            title={`아직 세부과제를 만들지 않으셨군요! \n 이제 세부과제를 만들어봐요`}
            icon="satellite"
          />
        ) : (
          filteredInitiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              id={initiative.id}
              name={initiative.name}
              deadline={initiative.deadline}
              setInitiative={props.setInitiative}
              onPress={() =>
                setProgress(
                  (filteredInitiatives.filter(
                    (initiative) => initiative.hasDone === true
                  ).length /
                    filteredInitiatives.length) *
                    100
                )
              }
            />
          ))
        )}
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
    flex: 1,
    marginTop: 22,
  },
});

export default KeyResultDetailScreen;

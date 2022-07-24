import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyView from "../components/EmptyView";
import Gap from "../components/Gap";
import ProgressCard from "../components/ProgressCard";
import Title from "../components/Title";

const ObjectiveDetailScreen = ({
  navigation,
  route,
  setCurrentRoute,
  setCurrentObjectiveId,
  keyResults,
  initiatives,
  id,
  ...props
}: any) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    setCurrentRoute("ObjectiveDetail");
    setCurrentObjectiveId(route.params.objective.id);
  }, [props, isFocused]);
  const filteredKeyResults = keyResults.filter(
    (keyResult: any) => keyResult.objectiveId === route.params.objective.id
  );
  const findKeyResultProgress = (id) => {
    let filteredInitiatives = initiatives.filter(
      (initiative) => initiative.keyResultId === id
    );
    if (filteredInitiatives.length === 0) {
      return 0;
    }

    let countedTrue = filteredInitiatives.filter(
      (initiative) => initiative.hasDone === true
    ).length;

    return (countedTrue / filteredInitiatives.length) * 100;
  };

  const keyResultProgressList = () => {
    return keyResults
      .map((keyResult) => keyResult)
      .filter(
        (keyResult) => keyResult.objectiveId === route.params.objective.id
      );
  };

  const keyResultProgressAverage = () => {
    let list = keyResultProgressList().map((keyResult) =>
      findKeyResultProgress(keyResult.id)
    );

    if (list.length === 0) {
      return 0;
    }

    let filteredList = list.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    return filteredList / list.length;
  };

  const fixedAverage: number = +keyResultProgressAverage().toFixed(1);
  return (
    <ScrollView style={styles.container}>
      <Title title={route.params.objective.name} type="default" />
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>진행도</Text>
          <Text
            style={[
              styles.infoCardValue,
              {
                color:
                  fixedAverage < 20
                    ? "#FF5252"
                    : fixedAverage < 70
                    ? "#FF9100"
                    : fixedAverage < 100
                    ? "#47CE09"
                    : "#4191FD",
              },
            ]}
          >
            {fixedAverage.toString()}%
          </Text>
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
        {filteredKeyResults.length === 0 ? (
          <EmptyView
            title={`목표를 다 만드셨군요!\n이젠 세부과제를 만들어봐요`}
            icon="antenna"
          />
        ) : (
          filteredKeyResults.map((keyResult: any) => (
            <ProgressCard
              key={keyResult.id}
              title={keyResult.name}
              date={keyResult.deadline}
              progress={findKeyResultProgress(keyResult.id).toFixed(1)}
              navigation={navigation}
              onPress={() =>
                navigation?.navigate("KeyResultDetail", { id: keyResult.id })
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
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
});

export default ObjectiveDetailScreen;

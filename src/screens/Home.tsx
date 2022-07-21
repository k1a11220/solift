import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EmptyView from "../components/EmptyView";
import ProgressCard from "../components/ProgressCard";
import { Objective, ROUTES } from "../libs/types";

const HomeScreen = ({ initiatives, keyResults, ...props }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    props.setCurrentRoute("Home");
  }, [props, isFocused]);
  const findKeyResultProgress = (id) => {
    let filteredInitiatives = initiatives.filter(
      (initiative) => initiative.keyResultId === id
    );
    let countedTrue = filteredInitiatives.filter(
      (initiative) => initiative.hasDone === true
    ).length;

    return (countedTrue / filteredInitiatives.length) * 100;
  };

  const keyResultProgressList = (id) => {
    return keyResults
      .map((keyResult) => keyResult)
      .filter((keyResult) => keyResult.objectiveId === id);
  };

  const keyResultProgressAverage = (id) => {
    let list = keyResultProgressList(id).map((keyResult) =>
      findKeyResultProgress(keyResult.id)
    );

    let filteredList = list.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    return filteredList / list.length;
  };

  const fixedAverage: number = (id) => {
    return +keyResultProgressAverage(id).toFixed(1);
  };
  const navigation = useNavigation<ROUTES>();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ height: 36, width: 69 }}
          source={require("../../assets/logo.png")}
        />
      </View>
      {props.objectives.length === 0 ? (
        <EmptyView title="새로운 목표를 만들어봐요" icon="scope" />
      ) : (
        <ScrollView style={styles.cardList}>
          {props.objectives.map((objective: Objective) => (
            <ProgressCard
              key={objective.id}
              title={objective.name}
              date={objective.deadline}
              progress={fixedAverage(objective.id)}
              onPress={() =>
                navigation.navigate("ObjectiveDetail", { objective })
              }
              navigation={navigation}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 22,
    paddingRight: 22,
  },
  logoContainer: {
    justifyContent: "center",
    height: 48,
    marginBottom: 12,
  },
  cardList: {},
});

export default HomeScreen;

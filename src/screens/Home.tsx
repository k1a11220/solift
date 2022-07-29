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

  const keyResultProgressList = (id) => {
    return keyResults
      .map((keyResult) => keyResult)
      .filter((keyResult) => keyResult.objectiveId === id);
  };

  const findKeyResultProgress = (id) => {
    let filteredInitiatives = initiatives.filter(
      (initiative) => initiative.keyResultId === id
    );
    if (filteredInitiatives.length === 0) {
      return 0;
    } else {
      let countedTrue = filteredInitiatives.filter(
        (initiative) => initiative.hasDone === true
      ).length;

      return (countedTrue / filteredInitiatives.length) * 100;
    }
  };

  const keyResultProgressAverage = (id) => {
    let list = keyResultProgressList(id).map((keyResult) =>
      findKeyResultProgress(keyResult.id)
    );
    if (list.length === 0) {
      return 0;
    }
    // console.log(keyResultProgressList(1));

    let filteredList = list.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    return filteredList / list.length;
  };

  const fixedAverage = (id: number) => {
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
          {/* <Text style={styles.title}>이번주까지 할 일</Text> */}
          <Text style={styles.title}>내 목표</Text>
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
    // marginBottom: 12,
    // borderBottomColor: "#e6e6e6",
    // borderBottomWidth: 1,
  },
  cardList: {
    paddingTop: 22,
  },
  title: {
    fontSize: 22,
    color: "#333D4B",
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default HomeScreen;

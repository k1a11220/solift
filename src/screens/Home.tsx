import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyView from "../components/EmptyView";
import InitiativeCard from "../components/InitiativeCard";
import ProgressCard from "../components/ProgressCard";
import { theme } from "../libs/theme";
import { Initiative, KeyResult, Objective, ROUTES } from "../libs/types";
import {
  findKeyResultProgress,
  keyResultProgressList,
  stringToDate,
} from "../utils";

interface HomeScreenProps {
  objectives: Objective[];
  keyResults: KeyResult[];
  initiatives: Initiative[];
  setInitiative: any;
  setCurrentRoute: any;
}

const HomeScreen = ({
  initiatives,
  keyResults,
  setInitiative,
  ...props
}: HomeScreenProps) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    props.setCurrentRoute("Home");
  }, [props, isFocused]);

  const keyResultProgressAverage = (id: number) => {
    let list = keyResultProgressList(keyResults, id).map(
      (keyResult: KeyResult) =>
        keyResult.id === null
          ? 0
          : findKeyResultProgress(initiatives, keyResult.id)
    );
    if (list.length === 0) {
      return 0;
    }
    let filteredList = list.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);
    return filteredList / list.length;
  };

  //get this week start and end
  const getThisWeek = () => {
    let today = new Date();
    let start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    start.setDate(start.getDate() - today.getDay());
    end.setDate(end.getDate() + (6 - today.getDay()));
    return [start, end];
  };
  const [thisWeekStart, thisWeekEnd] = getThisWeek();

  const thisWeekInitiatives = initiatives.filter(
    (initiative: Initiative) =>
      stringToDate(initiative.deadline) >= thisWeekStart &&
      stringToDate(initiative.deadline) <= thisWeekEnd
  );

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
          {/* <Text style={styles.title}>이번주까지 할 일</Text>
          {thisWeekInitiatives.map((initiative: Initiative) => (
            <InitiativeCard
              key={initiative.id}
              initiative={initiative}
              setInitiative={setInitiative}
              // setInitiatve hasDone to true if it is done
              onPress={() => setInitiative(initiative.id, { hasDone: true })}
            />
          ))} */}
          {/* <Text style={styles.title}>내 목표</Text> */}
          {props.objectives.map((objective: Objective) => (
            <ProgressCard
              key={objective.id}
              title={objective.name}
              date={objective.deadline}
              progress={
                objective.id === null
                  ? 0
                  : +keyResultProgressAverage(objective?.id).toFixed(1)
              }
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
    backgroundColor: theme.colors.white,
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
    color: theme.colors.grey500,
    fontWeight: "bold",
    marginBottom: 24,
  },
});

export default HomeScreen;

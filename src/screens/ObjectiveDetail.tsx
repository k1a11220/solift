import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useIsFocused,
} from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import EmptyView from "../components/EmptyView";
import Gap from "../components/Gap";
import ProgressCard from "../components/ProgressCard";
import Title from "../components/Title";
import { Initiative, KeyResult, Objective } from "../libs/types";
import { findKeyResultProgress, keyResultProgressList } from "../utils";

interface ObjectiveDetailScreenProps {
  setCurrentRoute: any;
  setCurrentObjectiveId: any;
  keyResults: KeyResult[];
  initiatives: Initiative[];
  route: RouteProp<{ params: { objective: Objective } }, "params"> | any;
  navigation: NavigationProp<ParamListBase>;
}

const ObjectiveDetailScreen = ({
  navigation,
  route,
  setCurrentRoute,
  setCurrentObjectiveId,
  keyResults,
  initiatives,
  ...props
}: ObjectiveDetailScreenProps) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    setCurrentRoute("ObjectiveDetail");
    setCurrentObjectiveId(route.params.objective.id);
  }, [props, isFocused]);

  const filteredKeyResults = keyResultProgressList(
    keyResults,
    route.params.objective.id !== null ? route.params.objective.id : 0
  );

  const keyResultProgressAverage = () => {
    let list = keyResultProgressList(
      keyResults,
      route.params.objective.id !== null ? route.params.objective.id : 0
    ).map((keyResult) =>
      findKeyResultProgress(
        initiatives,
        keyResult.id !== null ? keyResult.id : 0
      )
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
    <ScrollView style={styles.container} overScrollMode="always">
      <Title title={`${route.params.objective.name}`} type="default" />
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
              progress={parseFloat(
                findKeyResultProgress(initiatives, keyResult.id).toFixed(1)
              )}
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

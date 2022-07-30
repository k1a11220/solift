import { RouteProp, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import EmptyView from "../components/EmptyView";
import InitiativeCard from "../components/InitiativeCard";
import Title from "../components/Title";
import * as Haptics from "expo-haptics";
import { Initiative, KeyResult, Objective } from "../libs/types";
import { getCurrentKeyResult, getCurrentObjective } from "../utils";

interface KeyResultDetailScreenProps {
  objectives: Objective[];
  keyResults: KeyResult[];
  initiatives: Initiative[];
  setInitiative: any;
  setCurrentRoute: any;
  setCurrentKeyResultId: any;
  deleteInitiative: any;
  route: RouteProp<{ params: { id: number } }, "params"> | any;
}

interface RenderItemProps {
  item: Initiative;
}

const KeyResultDetailScreen = ({
  objectives,
  keyResults,
  initiatives,
  setInitiative,
  setCurrentRoute,
  setCurrentKeyResultId,
  deleteInitiative,
  ...props
}: KeyResultDetailScreenProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    setCurrentRoute("KeyResultDetail");
    setCurrentKeyResultId(props.route.params.id);
  }, [props, isFocused]);

  const currentKeyResult = getCurrentKeyResult(
    keyResults,
    props.route.params.id
  );

  const currentObjective =
    currentKeyResult?.objectiveId === null
      ? null
      : getCurrentObjective(
          objectives,
          currentKeyResult?.objectiveId !== undefined
            ? currentKeyResult.objectiveId
            : 0
        );

  const filteredInitiatives = initiatives.filter(
    (initiative: any) => initiative.keyResultId === currentKeyResult?.id
  );

  const newProgress =
    (filteredInitiatives.filter((initiative) => initiative.hasDone === true)
      .length /
      filteredInitiatives.length) *
    100;
  const [progress, setProgress] = useState(newProgress);

  const renderItem = (data: RenderItemProps) => {
    return (
      <View style={{ marginRight: 22, marginLeft: 22 }} key={data.item.id}>
        <InitiativeCard
          initiative={data.item}
          setInitiative={setInitiative}
          onPress={() => {
            setProgress(
              (filteredInitiatives.filter(
                (initiative) => initiative.hasDone === true
              ).length /
                filteredInitiatives.length) *
                100
            );
          }}
        />
      </View>
    );
  };

  const renderHiddenItem = (data: RenderItemProps, rowmap: any) => {
    return (
      <TouchableOpacity
        style={styles.rowBack}
        onPress={() => {
          deleteInitiative(data.item.id);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text style={styles.backTextWhite}>삭제</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {filteredInitiatives.length === 0 ? (
        <>
          <ScrollView
            style={{
              flex: 1,
              marginBottom: 20,
              marginRight: 22,
              marginLeft: 22,
            }}
          >
            <Title
              title={`${currentKeyResult?.name}`}
              subtitle={`${currentObjective?.name}`}
              progress={newProgress}
              date={`${currentKeyResult?.deadline}`}
              type="progress"
            />
            <EmptyView
              title={`아직 세부과제를 만들지 않으셨군요! \n 이제 세부과제를 만들어봐요`}
              icon="satellite"
            />
          </ScrollView>
        </>
      ) : (
        <SwipeListView
          data={filteredInitiatives}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          bounces={true}
          rightOpenValue={-90 - 16}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={{ marginBottom: 20, marginRight: 22, marginLeft: 22 }}>
              <Title
                title={`${currentKeyResult?.name}`}
                subtitle={`${currentObjective?.name}`}
                progress={newProgress}
                date={`${currentKeyResult?.deadline}`}
                type="progress"
              />
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    paddingBottom: 22,
  },

  cardList: {
    flex: 1,
    marginTop: 22,
  },

  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    marginRight: 22,
    marginLeft: 22,
    marginBottom: 16,
  },

  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 90,
    borderRadius: 12,
  },

  backRightBtnRight: {
    backgroundColor: "#FF5252",
    right: 0,
  },

  backTextWhite: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default KeyResultDetailScreen;

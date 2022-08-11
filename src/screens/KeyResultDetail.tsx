import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
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
import { Initiative, KeyResult, Objective, ROUTES } from "../libs/types";
import { getCurrentKeyResult, getCurrentObjective } from "../utils";
import { theme } from "../libs/theme";
import { clickInitiative } from "../utils/firebaseAnalytics";

interface KeyResultDetailScreenProps {
  objectives: Objective[];
  keyResults: KeyResult[];
  initiatives: Initiative[];
  setInitiatives: any;
  setCurrentRoute: any;
  setCurrentKeyResultId: any;
  deleteInitiative: any;
  deviceName: string;
  route: RouteProp<{ params: { id: number } }, "params"> | any;
}

interface RenderItemProps {
  item: Initiative;
}

const KeyResultDetailScreen = ({
  objectives,
  keyResults,
  initiatives,
  setInitiatives,
  setCurrentRoute,
  setCurrentKeyResultId,
  deleteInitiative,
  deviceName,
  ...props
}: KeyResultDetailScreenProps) => {
  const isFocused = useIsFocused();

  const navigation: ROUTES = useNavigation();

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

  const clickInitiativeHandler = (initiative: Initiative) => {
    if (initiative.keyResultId && initiative.name !== null) {
      clickInitiative(
        deviceName,
        initiative.keyResultId,
        initiative.name,
        initiative.hasDone
      );
    }
  };

  const renderItem = (data: RenderItemProps, rowMap: any) => {
    return (
      <View style={{ marginRight: 22, marginLeft: 22 }} key={data.item.id}>
        <InitiativeCard
          initiative={data.item}
          initiatives={initiatives}
          setInitiatives={setInitiatives}
          onPress={() => {
            clickInitiativeHandler(data.item);
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

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (
    data: RenderItemProps,
    rowMap: any,
    rowKey: any
  ) => {
    return (
      <View style={styles.hiddenViewContainer}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => {
            closeRow(rowMap, data.item.id);
            navigation.navigate("EditInitiative", {
              currentInitiativeId: data.item.id,
            });
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
            <Text style={styles.backTextWhite}>편집</Text>
          </View>
        </TouchableOpacity>
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
      </View>
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
              title={`핵심 지표를 이루기 위한 \n 구체적인 과제를 만들어봐요`}
              icon="satellite"
            />
          </ScrollView>
        </>
      ) : (
        <SwipeListView
          keyExtractor={(rowData: any, index) => {
            return rowData.id.toString();
          }}
          data={filteredInitiatives}
          renderItem={renderItem}
          closeOnRowPress={true}
          renderHiddenItem={(data, rowMap) => {
            return renderHiddenItem(data, rowMap, data.item.id);
          }}
          disableRightSwipe
          bounces={true}
          rightOpenValue={-90 - 90 - 16 - 16}
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
    backgroundColor: theme.colors.white,
    paddingBottom: 22,
  },

  cardList: {
    flex: 1,
    marginTop: 22,
  },

  hiddenViewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  rowBack: {
    alignItems: "center",
    width: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    marginRight: 22,
    marginBottom: 16,
  },

  editBtn: {
    alignItems: "center",
    width: 90,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
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
    backgroundColor: theme.colors.red500,
    right: 0,
  },

  backRightBtnLeft: {
    backgroundColor: theme.colors.grey300,
    right: 0,
  },

  backTextWhite: {
    color: theme.colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});

export default KeyResultDetailScreen;

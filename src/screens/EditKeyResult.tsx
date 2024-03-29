import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import {
  getCurrentKeyResult,
  getCurrentObjective,
  sortByLatestDate,
  sortByLatestId,
  stringToDate,
} from "../utils";
import { KeyResult, Objective } from "../libs/types";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDate } from "../utils/useDate";
import { theme } from "../libs/theme";

interface EditKeyResultScreenProps {
  keyResults: KeyResult[];
  setCurrentRoute: any;
  currentObjectiveId: number;
  objectives: Objective[];
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { currentKeyResultId: number } }, "params"> | any;
  setKeyResults: any;
}

const EditKeyResultScreen = ({
  keyResults,
  setCurrentRoute,
  currentObjectiveId,
  objectives,
  setKeyResults,
  ...props
}: EditKeyResultScreenProps) => {
  useEffect(() => {
    setCurrentRoute("EditKeyResult");
  });

  const currentKeyResult = getCurrentKeyResult(
    keyResults,
    props.route.params.currentKeyResultId
  );

  const currentDate = stringToDate(currentKeyResult?.deadline);

  const [date, setDate] = useState(currentDate);
  const [name, setName] = useState(currentKeyResult?.name);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.navigation.goBack();
    let filteredKeyResults = keyResults.filter(
      (keyResult) => keyResult.id !== currentKeyResult?.id
    );
    let edited = [
      ...filteredKeyResults,
      {
        id: currentKeyResult?.id,
        name: name,
        deadline: useDate(date),
        objectiveId: currentObjectiveId,
      },
    ];
    AsyncStorage.setItem("keyResults", JSON.stringify(sortByLatestDate(edited)))
      .then(() => {
        setKeyResults(sortByLatestDate(edited));
      })
      .catch((error) => console.log(error));
  };

  const currentObjective = getCurrentObjective(objectives, currentObjectiveId);

  return (
    <>
      <ScrollView
        overScrollMode="never"
        bounces={false}
        style={styles.container}
      >
        <Title
          title="핵심 지표와 마감일을 알려주세요"
          detail="목표를 이루기 위해 해야할 일이에요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder={currentKeyResult?.name}
            value={name}
            onChangeText={(text: any) => {
              setName(text);
            }}
          />
          <Gap />
          <DatePickerModal
            date={date}
            onChange={onChange}
            maximumDate={stringToDate(currentObjective?.deadline)}
          />
          <CTA label="수정하기" type="primary" onPress={onSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    paddingLeft: 22,
    paddingRight: 22,
  },

  contentContainer: {
    paddingTop: 22,
    flex: 1,
    padding: 0,
  },
});

export default EditKeyResultScreen;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import DatePickerModal from "../components/DatePickerModal";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import { theme } from "../libs/theme";
import { KeyResult, Objective } from "../libs/types";
import { getCurrentObjective, stringToDate } from "../utils";
import { createKeyResult } from "../utils/firebaseAnalytics";
import { useDate } from "../utils/useDate";

interface CreateKeyResultScreenProps {
  keyResult: KeyResult;
  setKeyResult: any;
  handleKeyResult: any;
  latestKeyResultId: number;
  setLatestKeyResultId: any;
  currentObjectiveId: number;
  setCurrentRoute: any;
  objectives: Objective[];
  deviceName: string;
  navigation: NavigationProp<ParamListBase>;
}

const CreateKeyResultScreen = ({
  keyResult,
  setKeyResult,
  handleKeyResult,
  latestKeyResultId,
  setLatestKeyResultId,
  currentObjectiveId,
  setCurrentRoute,
  objectives,
  deviceName,
  ...props
}: CreateKeyResultScreenProps) => {
  useEffect(() => {
    setCurrentRoute("CreateKeyResult");
  });

  const currentObjective = getCurrentObjective(objectives, currentObjectiveId);

  const [date, setDate] = useState(stringToDate(currentObjective?.deadline));

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setKeyResult({
      ...keyResult,
      deadline: useDate(currentDate),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    handleKeyResult();
    if (keyResult.name !== null) {
      createKeyResult(deviceName, currentObjectiveId, keyResult.name);
    }
    AsyncStorage.setItem(
      "latestKeyResultId",
      JSON.stringify(latestKeyResultId + 1)
    )
      .then(() => {
        setLatestKeyResultId(latestKeyResultId + 1);
      })
      .catch((error) => console.log(error));
    props.navigation.goBack();
  };

  return (
    <ScrollView overScrollMode="never" style={styles.container} bounces={false}>
      <Title
        title="핵심 지표와 마감일을 알려주세요"
        detail="목표를 이루기 위해 해야할 일이에요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="인문학 책 10권 읽기"
          value={keyResult.name}
          onChangeText={(text: any) =>
            setKeyResult({
              ...keyResult,
              name: text,
              id: latestKeyResultId,
              objectiveId: currentObjectiveId,
              deadline: format(date, "yyyy/MM/dd"),
            })
          }
        />
        <Gap />
        <DatePickerModal
          date={date}
          onChange={onChange}
          maximumDate={stringToDate(currentObjective?.deadline)}
        />
        <CTA
          label="다음으로"
          type="primary"
          onPress={onSubmit}
          disabled={keyResult.name ? false : true}
        />
      </View>
    </ScrollView>
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
  },
});

export default CreateKeyResultScreen;

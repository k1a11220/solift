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
import { KeyResult, Objective } from "../libs/types";
import { getCurrentObjective, stringToDate } from "../utils";
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
        title="?????? ????????? ???????????? ???????????????"
        detail="????????? ???????????? ?????? ?????? ????????????"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="????????? ??? 10??? ??????"
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
          minimumDate={stringToDate(currentObjective?.deadline)}
        />
        <CTA
          label="????????????"
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
    backgroundColor: "#fff",
    paddingLeft: 22,
    paddingRight: 22,
  },

  contentContainer: {
    paddingTop: 22,
    flex: 1,
  },
});

export default CreateKeyResultScreen;

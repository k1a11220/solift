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
import { Initiative, KeyResult } from "../libs/types";
import { getCurrentKeyResult, stringToDate } from "../utils";
import { createInitiative } from "../utils/firebaseAnalytics";

interface CreateInitiativeScreenProps {
  initiative: Initiative;
  setInitiative: any;
  handleInitiative: any;
  keyResults: KeyResult[];
  currentKeyResultId: number;
  setCurrentRoute: any;
  latestInitiativeId: number;
  setLatestInitiativeId: any;
  deviceName: string;
  navigation: NavigationProp<ParamListBase>;
}

const CreateInitiativeScreen = ({
  initiative,
  setInitiative,
  handleInitiative,
  keyResults,
  currentKeyResultId,
  setCurrentRoute,
  latestInitiativeId,
  setLatestInitiativeId,
  deviceName,
  ...props
}: CreateInitiativeScreenProps) => {
  useEffect(() => {
    setCurrentRoute("CreateInitiative");
  });

  const currentKeyResult = getCurrentKeyResult(keyResults, currentKeyResultId);

  const [date, setDate] = useState(stringToDate(currentKeyResult?.deadline));

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setInitiative({
      ...initiative,
      deadline: format(currentDate, "yyyy/MM/dd"),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    handleInitiative();
    if (initiative.name !== null) {
      createInitiative(deviceName, currentKeyResultId, initiative.name);
    }
    AsyncStorage.setItem(
      "latestInitiativeId",
      JSON.stringify(latestInitiativeId + 1)
    )
      .then(() => {
        setLatestInitiativeId(latestInitiativeId + 1);
      })
      .catch((error) => console.log(error));
    props.navigation.goBack();
  };

  return (
    <ScrollView overScrollMode="never" style={styles.container} bounces={false}>
      <Title
        title="세부 과제와 마감일을 알려주세요"
        detail="핵심 지표를 이루기 위한 구체적인 과제에요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="나의 한국현대사 읽기"
          value={initiative.name}
          onChangeText={(text: any) =>
            setInitiative({
              ...initiative,
              name: text,
              id: latestInitiativeId,
              keyResultId: currentKeyResultId,
              deadline: format(date, "yyyy/MM/dd"),
            })
          }
        />
        <Gap />
        <DatePickerModal
          date={date}
          onChange={onChange}
          maximumDate={stringToDate(currentKeyResult?.deadline)}
        />
        <CTA
          label="다음으로"
          type="primary"
          onPress={onSubmit}
          disabled={initiative.name ? false : true}
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

export default CreateInitiativeScreen;

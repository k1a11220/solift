import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
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
import { getCurrentKeyResult, sortByLatestDate, stringToDate } from "../utils";
import { useDate } from "../utils/useDate";

interface EditInitiativeScreenProps {
  initiatives: Initiative[];
  setCurrentRoute: any;
  currentKeyResultId: number;
  setInitiatives: any;
  navigation: NavigationProp<ParamListBase>;
  keyResults: KeyResult[];
  route: RouteProp<{ params: { currentInitiativeId: number } }, "params"> | any;
}

const EditInitiativeScreen = ({
  initiatives,
  setCurrentRoute,
  currentKeyResultId,
  setInitiatives,
  keyResults,
  ...props
}: EditInitiativeScreenProps) => {
  useEffect(() => {
    setCurrentRoute("CreateInitiative");
  });

  const currentInitiative = initiatives.find(
    (initiative) => initiative.id === props.route.params.currentInitiativeId
  );

  const currentKeyResult = getCurrentKeyResult(keyResults, currentKeyResultId);

  const [newName, setNewName] = useState(currentInitiative?.name);
  const [newDate, setNewDate] = useState(
    stringToDate(currentInitiative?.deadline)
  );

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setNewDate(currentDate);
  };

  const onSubmit = () => {
    let filteredInitiatives = initiatives.filter(
      (initiative) => initiative.id !== currentInitiative?.id
    );
    let edited = [
      ...filteredInitiatives,
      {
        id: currentInitiative?.id,
        name: newName,
        deadline: useDate(newDate),
        keyResultId: currentKeyResultId,
      },
    ];
    AsyncStorage.setItem(
      "initiatives",
      JSON.stringify(sortByLatestDate(edited))
    )
      .then(() => {
        setInitiatives(edited);
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
          value={newName}
          onChangeText={(text: any) => setNewName(text)}
        />
        <Gap />
        <DatePickerModal
          date={newDate}
          onChange={onChange}
          maximumDate={stringToDate(currentKeyResult?.deadline)}
        />
        <CTA
          label="다음으로"
          type="primary"
          onPress={onSubmit}
          disabled={currentInitiative?.name ? false : true}
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

export default EditInitiativeScreen;

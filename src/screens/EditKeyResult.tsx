import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import { format } from "date-fns";
import {
  getCurrentKeyResult,
  getCurrentObjective,
  stringToDate,
} from "../utils";
import { KeyResult, Objective } from "../libs/types";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

interface EditKeyResultScreenProps {
  keyResults: KeyResult[];
  setCurrentRoute: any;
  currentObjectiveId: number;
  objectives: Objective[];
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { currentKeyResultId: number } }, "params">;
}

const EditKeyResultScreen = ({
  keyResults,
  setCurrentRoute,
  currentObjectiveId,
  objectives,
  ...props
}: EditKeyResultScreenProps) => {
  useEffect(() => {
    setCurrentRoute("EditKeyResult");
  });

  const keyResult = getCurrentKeyResult(
    props.route.params.currentKeyResultId,
    keyResults
  );

  const [date, setDate] = useState(new Date());
  const [name, setName] = useState(keyResult?.name);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    if (keyResult !== undefined) {
      keyResult.deadline = format(currentDate, "yyyy/MM/dd");
    }
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.navigation.goBack();
  };

  const currentObjective = getCurrentObjective(currentObjectiveId, objectives);

  return (
    <>
      <ScrollView overScrollMode="never" style={styles.container}>
        <Title
          title="keyResult and deadline"
          detail="어떤 목표든 괜찮아요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder={keyResult?.name}
            value={keyResult?.name}
            onChangeText={(text: any) => {
              setName(text);
              if (keyResult !== undefined) {
                keyResult.name = text;
              }
            }}
          />
          <Gap />
          <DatePickerModal
            date={stringToDate(keyResult?.deadline)}
            onChange={onChange}
            minimumDate={stringToDate(currentObjective?.deadline)}
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
    backgroundColor: "#fff",
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

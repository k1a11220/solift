import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import DatePickerModal from "../components/DatePickerModal";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import { getCurrentObjective, stringToDate } from "../utils";

const CreateKeyResultScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("CreateKeyResult");
  });

  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setKeyResult({
      ...props.keyResult,
      deadline: format(currentDate, "yyyy/MM/dd"),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props?.handleKeyResult();
    props?.setLatestKeyResultId(props?.latestKeyResultId + 1);
    props?.navigation.goBack();
  };

  const currentObjective = getCurrentObjective(
    props.currentObjectiveId,
    props.objectives
  );

  return (
    <ScrollView overScrollMode="never" style={styles.container} bounces={false}>
      <Title
        title="핵심 지표와 마감일을 알려주세요"
        detail="목표를 달성하기 위한 주요 지표에요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="인문학 책 10권 읽기"
          value={props.keyResult.name}
          onChangeText={(text: any) =>
            props.setKeyResult({
              ...props.keyResult,
              name: text,
              id: props.latestKeyResultId,
              objectiveId: props.currentObjectiveId,
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
          label="다음으로"
          type="primary"
          onPress={onSubmit}
          disabled={props.keyResult.name ? false : true}
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

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import DatePickerModal from "../components/DatePickerModal";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";

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

  return (
    <ScrollView overScrollMode="never" style={styles.container}>
      <Title
        title="KeyResult and deadline"
        detail="어떤 목표든 괜찮아요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="목표를 입력하세요"
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
        <DatePickerModal date={date} onChange={onChange} />
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

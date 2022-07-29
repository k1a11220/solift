import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import DatePickerModal from "../components/DatePickerModal";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";

const CreateInitiativeScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("CreateInitiative");
  });
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setInitiative({
      ...props.initiative,
      deadline: format(currentDate, "yyyy/MM/dd"),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleInitiative();
    props?.setLatestInitiativeId(props?.latestInitiativeId + 1);
    props.navigation.goBack();
  };

  return (
    <ScrollView overScrollMode="never" style={styles.container} bounces={false}>
      <Title
        title="세부 과제와 마감일을 알려주세요"
        detail="핵심 지표를 달성하기 위한 구체적인 과제에요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="나의 한국현대사 읽기"
          value={props.initiative.name}
          onChangeText={(text: any) =>
            props.setInitiative({
              ...props.initiative,
              name: text,
              id: props.latestInitiativeId,
              keyResultId: props.currentKeyResultId,
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
          disabled={props.initiative.name ? false : true}
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

export default CreateInitiativeScreen;

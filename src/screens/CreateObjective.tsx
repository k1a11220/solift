import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import DatePickerModal from "../components/DatePickerModal";
import { format } from "date-fns";

const CreateObjectiveScreen = ({ ...props }) => {
  useEffect(() => {
    props.setCurrentRoute("CreateObjective");
  });

  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    props.setObjective({
      ...props.objective,
      deadline: format(currentDate, "yyyy/MM/dd"),
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleObjective();
    props.setLatestObjectiveId(props.latestObjectiveId + 1);
    props.navigation.goBack();
  };

  return (
    <>
      <ScrollView
        overScrollMode="never"
        style={styles.container}
        bounces={false}
      >
        <Title
          title="목표와 마감일을 알려주세요"
          detail="여러분이 최종적으로 이루고 싶은 목표에요"
          type="detail"
        />
        <View style={styles.contentContainer}>
          <Input
            placeholder="인문학적 소양 기르기"
            value={props.objective.name}
            onChangeText={(text: any) =>
              props.setObjective({
                ...props.objective,
                name: text,
                id: props.latestObjectiveId,
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
            disabled={props.objective.name ? false : true}
          />
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

export default CreateObjectiveScreen;

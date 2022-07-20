import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import CTA from "../components/Cta";
import Gap from "../components/Gap";
import Input from "../components/Input";
import Title from "../components/Title";
import { useDate } from "../utils/useDate";

const CreateObjectiveScreen = ({ ...props }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    props.setObjective({
      ...props.objective,
      deadline: currentDate.toISOString().split("T")[0].replaceAll("-", "/"),
      id: props.latesetObjectiveId,
    });
    setDate(currentDate);
  };

  const onSubmit = () => {
    props.handleObjective();
    props.setLatesetObjectiveId(props.latesetObjectiveId + 1);
    props.navigation.goBack();
  };

  return (
    <ScrollView overScrollMode="never" style={styles.container}>
      <Title
        title="Objective and deadline"
        detail="어떤 목표든 괜찮아요"
        type="detail"
      />
      <View style={styles.contentContainer}>
        <Input
          placeholder="목표를 입력하세요"
          value={props.objective.name}
          onChangeText={(text: any) =>
            props.setObjective({ ...props.objective, name: text })
          }
        />
        <Gap />
        <RNDateTimePicker
          value={date}
          onChange={onChange}
          mode="date"
          locale="ko-KR"
        />
        <CTA label="다음으로" type="primary" onPress={onSubmit} />
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

export default CreateObjectiveScreen;